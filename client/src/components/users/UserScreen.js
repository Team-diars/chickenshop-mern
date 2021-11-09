import React, { useEffect, useState } from "react";
import { Link as ReachLink } from "react-router-dom";
import { connect } from "react-redux";
import { getUsers, addUser, deleteUser } from "../../actions/user";
import { getEmployees } from "../../actions/employee";
import PropTypes from "prop-types";
import {
  Container,
  Box,
  Button,
  Input,
  Text,
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Select,
  FormControl,
  FormLabel,
  ModalOverlay,
  ModalContent,
  Icon,
} from "@chakra-ui/react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

const UserScreen = ({
  getUsers,
  addUser,
  deleteUser,
  getEmployees,
  employee: { employees, loading: loading_emp },
  user: { users, loading },
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    employee: "",
  });
  const { employee, password } = formData;
  // const handleOpen = () => setIsOpen(!isOpen);

  const submitUser = () => {
    addUser({ employee, password });
    setFormData({ employee: "", password: "" });
    // setIsOpen(!isOpen);
    onClose();
  };
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  useEffect(() => {
    getEmployees();
  }, [getEmployees]);
  const onChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  return (
    <Container maxWidth="container.xl" paddingTop="10">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="10"
      >
        <Text fontSize="2xl" fontWeight="semibold">
          Usuarios
        </Text>
        <Button onClick={onOpen} fontSize="lg" colorScheme="blue">
          <Icon as={FiPlus} h={6} w={6} alignSelf={"center"} mr="2" /> Agregar
          Usuario
        </Button>
      </Box>

      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>NOMBRE</Th>
            <Th>EMAIL</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user, idx) => (
            <Tr key={idx}>
              <Td>{user._id}</Td>
              <Td>
                {user.name} {user.lastname}
              </Td>
              <Td>{user.email}</Td>
              <Td>
                <Button
                  as={ReachLink}
                  to={`/users/edit/${user.coduser.toString()}`}
                >
                  <Icon as={FiEdit} h={4} w={4} alignSelf={"center"} />
                </Button>
                <Button ml="2" onClick={() => deleteUser(user.coduser)}>
                  <Icon as={FiTrash2} h={4} w={4} alignSelf={"center"} />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Usuario</ModalHeader>
          <ModalBody>
            <FormControl mt={1}>
              <FormLabel>Empleado</FormLabel>
              <Select
                name="employee"
                type="select"
                onChange={(e) => onChange(e)}
                value={employee}
              >
                <option value="">Selecciona un empleado</option>
                {employees.map(
                  (emp) =>
                    emp.coduser === null && (
                      <option key={emp._id} value={emp._id}>
                        {emp.lastname} {emp.name} | {emp.dni}
                      </option>
                    )
                )}
              </Select>
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Contrasena</FormLabel>
              <Input
                name="password"
                value={password}
                type="password"
                onChange={(e) => onChange(e)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={submitUser}>
              Agregar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  employee: state.employee,
});

UserScreen.propTypes = {
  addUser: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  getEmployees: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, {
  getUsers,
  addUser,
  deleteUser,
  getEmployees,
})(UserScreen);
