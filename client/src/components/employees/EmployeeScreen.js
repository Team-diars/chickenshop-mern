import React, { useEffect, useState } from "react";
import { Link as ReachLink } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import {
  getEmployees,
  deleteEmployee,
  addEmployee,
} from "../../actions/employee";
import PropTypes from "prop-types";
import {
  Container,
  Text,
  useDisclosure,
  Button,
  Table,
  Box,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  FormLabel,
  Input,
  Select,
  ModalCloseButton,
  FormControl,
  Icon,
} from "@chakra-ui/react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
const EmployeeScreen = ({
  getEmployees,
  addEmployee,
  deleteEmployee,
  employee: { employees, loading },
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    dni: "",
    address: "",
    email: "",
    role: "",
  });
  const { name, lastname, dni, address, email, role } = formData;
  // const handleOpen = () => setIsOpen(!isOpen);
  const submitEmployee = () => {
    addEmployee({ name, lastname, role, dni, email, address });
    setFormData({
      name: "",
      lastname: "",
      role: "",
      dni: "",
      email: "",
      address: "",
    });
    // setIsOpen(!isOpen);
    onClose();
  };
  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Container maxWidth="container.xl" paddingTop="10">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="10"
      >
        <Text fontSize="2xl" fontWeight="semibold">
          Empleados
        </Text>
        <Button onClick={onOpen} fontSize="lg" colorScheme="blue">
          <Icon as={FiPlus} h={6} w={6} alignSelf={"center"} mr="2" /> Agregar Empleado
        </Button>
      </Box>
      <div>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>NOMBRE</Th>
                <Th>ROL</Th>
                <Th>DNI</Th>
                <Th>EMAIL</Th>
                <Th>DIRECCION</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {employees.map((employee) => (
                <Tr key={employee._id}>
                  <Td>{employee._id}</Td>
                  <Td>
                    {employee.name} {employee.lastname}
                  </Td>
                  <Td>{employee.role}</Td>
                  <Td>{employee.dni}</Td>
                  <Td>{employee.email}</Td>
                  <Td>{employee.address}</Td>
                  <Td>
                    <Button as={ReachLink} to={`/employees/edit/${employee._id.toString()}`}>
                      <Icon as={FiEdit} h={4} w={4} alignSelf={"center"} />
                    </Button>
                    <Button
                      ml="2"
                      onClick={(e) => deleteEmployee(employee._id)}
                    >
                      <Icon as={FiTrash2} h={4} w={4} alignSelf={"center"} />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </div>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Empleado</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mt={1}>
              <FormLabel>Nombres</FormLabel>
              <Input
                name="name"
                value={name}
                type="text"
                onChange={(e) => onChange(e)}
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Apellidos</FormLabel>

              <Input
                name="lastname"
                type="text"
                value={lastname}
                onChange={(e) => onChange(e)}
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Rol</FormLabel>

              <Select
                as="select"
                name="role"
                value={role}
                onChange={(e) => onChange(e)}
              >
                <option value="">-- Selecciona el rol --</option>
                <option value="admin">Admin</option>
                <option value="cashier">Cashier</option>
              </Select>
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>DNI</FormLabel>
              <Input
                name="dni"
                value={dni}
                type="text"
                onChange={(e) => onChange(e)}
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={email}
                type="email"
                onChange={(e) => onChange(e)}
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Direccion</FormLabel>
              <Input
                name="address"
                value={address}
                type="text"
                onChange={(e) => onChange(e)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={submitEmployee}>
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
  employee: state.employee,
});
EmployeeScreen.propTypes = {
  getEmployees: PropTypes.func.isRequired,
  addEmployee: PropTypes.func.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, {
  getEmployees,
  addEmployee,
  deleteEmployee,
})(EmployeeScreen);
