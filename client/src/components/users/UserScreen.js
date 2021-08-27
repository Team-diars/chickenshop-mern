import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { FormGroup, Spinner } from "react-bootstrap";
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
} from "@chakra-ui/react";

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
  
  return loading && loading_emp ? (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    <Container maxWidth="container.xl">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="10"
      >
        <Text fontSize="2xl" fontWeight="semibold">
          Users
        </Text>
        <Button onClick={onOpen}>
          <i className="fas fa-plus"></i> Register User
        </Button>
      </Box>
      <>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>NAME</Th>
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
                  <LinkContainer to={`/users/edit/${user.coduser}`}>
                    <Button variant="warning" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteUser(user.coduser)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add User</ModalHeader>
          <ModalBody>
            <FormControl mt={1}>
              <FormLabel>Employee</FormLabel>
              <Select
                name="employee"
                type="select"
                onChange={(e) => onChange(e)}
                value={employee}
              >
                <option value="">Select an employee</option>
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
              <FormLabel>Password</FormLabel>
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
              Insert
            </Button>
            <Button onClick={onClose}>Cancel</Button>
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
