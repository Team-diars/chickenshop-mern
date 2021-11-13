import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getEmployeeByID, updateEmployee } from "../../actions/employee";
import { Link as ReachLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Text,
  Icon,
} from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { Loader } from "./../../components/loader/Loader";

function EditEmployee({
  history,
  getEmployeeByID,
  updateEmployee,
  employee: { employee, loading },
  match,
}) {
  const [formData, setFormData] = useState({
    _id: null,
    name: "",
    lastname: "",
    dni: "",
    address: "",
    email: "",
    role: "",
  });
  const { name, lastname, dni, address, email, role } = formData;
  const getEmployee = (id) => {
    getEmployeeByID(id);
  };
  useEffect(() => {
    getEmployee(match.params.id);
  }, [match.params.id]);
  useEffect(() => {
    if (!loading && employee) {
      setFormData({
        _id: employee._id || "",
        name: employee.name || "",
        lastname: employee.lastname || "",
        dni: employee.dni || "",
        address: employee.address || "",
        email: employee.email || "",
        role: employee.role || "",
      });
    }
  }, [employee, loading]);
  const onChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };
  return (
    <Container paddingY="10">
      <Box
        display="flex"
        alignItems="center"
        marginBottom="6"
        position="relative"
      >
        <Button as={ReachLink} to="/employees" mr={[3, 5]} variant="ghost">
          <Icon as={FiArrowLeft} h={[5, 6]} w={[5, 6]} alignSelf={"center"} />
        </Button>
        <Text
          fontSize="2xl"
          textAlign="center"
          fontWeight="bold"
          lineHeight="short"
        >
          Editar Empleado
        </Text>
      </Box>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box p="4" borderWidth="1px" borderRadius="md">
            <FormControl marginBottom="3">
              <FormLabel>Nombres</FormLabel>
              <Input
                name="name"
                value={name}
                type="text"
                onChange={(e) => onChange(e)}
              />
            </FormControl>
            <FormControl marginBottom="3">
              <FormLabel>Apellidos</FormLabel>
              <Input
                name="lastname"
                type="text"
                value={lastname}
                onChange={(e) => onChange(e)}
              />
            </FormControl>
            <FormControl marginBottom="3">
              <FormLabel>Rol</FormLabel>
              <Select
                as="select"
                name="role"
                value={role}
                onChange={(e) => onChange(e)}
              >
                <option value="">Selecciona un rol</option>
                <option value="admin">Admin</option>
                <option value="cajero">Cajero</option>
              </Select>
            </FormControl>
            <FormControl marginBottom="3">
              <FormLabel>DNI</FormLabel>
              <Input
                name="dni"
                value={dni}
                type="text"
                onChange={(e) => onChange(e)}
              />
            </FormControl>
            <FormControl marginBottom="3">
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={email}
                type="email"
                onChange={(e) => onChange(e)}
              />
            </FormControl>
            <FormControl marginBottom="3">
              <FormLabel>Direccion</FormLabel>
              <Input
                name="address"
                value={address}
                type="text"
                onChange={(e) => onChange(e)}
              />
            </FormControl>
          </Box>
          <Box
            mt="4"
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            {/* <Button as={ReachLink} to="/employees" mr={3} variant="ghost">
              <Icon
                as={FiArrowLeft}
                h={[4, 6]}
                w={[4, 6]}
                alignSelf={"center"}
              />
            </Button> */}
            <Button
              colorScheme="blue"
              type="submit"
              onClick={() => updateEmployee(match.params.id, formData, history)}
            >
              Guardar
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}
const mapStateToProps = (state) => ({
  employee: state.employee,
});
EditEmployee.propTypes = {
  getEmployeeByID: PropTypes.func.isRequired,
  updateEmployee: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, { getEmployeeByID, updateEmployee })(
  EditEmployee
);