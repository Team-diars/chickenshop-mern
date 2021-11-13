import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getEmployeeByID, updateEmployee } from "../../actions/employee";
import { Link } from "react-router-dom";
import { Input, FormControl, Select, Button, FormLabel } from "@chakra-ui/react";
import { Form, ModalBody, ModalFooter, Spinner } from "react-bootstrap";
import "../../components/users/index.css";
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
    <div style={{padding:"1rem"}}>
      {/* <ModalHeader>Edit Employee</ModalHeader> */}
      {loading ? (
        <div className="container p-5 d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
        </div>
      ) : (
        <div className="edit-wrapper">
          <ModalBody style={{width:"100%",marginBottom:"1rem"}}>
            <FormControl className="form-group" style={{width:"100%"}}>
              <FormLabel>Name</FormLabel>
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
          {/* <Box
            mt="4"
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          > */}
            {/* <Button as={ReachLink} to="/employees" mr={3} variant="ghost">
              <Icon
                as={FiArrowLeft}
                h={[4, 6]}
                w={[4, 6]}
                alignSelf={"center"}
              />
            </Button> */}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              type="submit"
              onClick={() => updateEmployee(match.params.id, formData, history)}
            >
              Guardar
            </Button>
            <Link to="/employees" className="btn btn-danger">
              Cancel
            </Link>
          </ModalFooter>
        </div>
      )}
    </div>
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
