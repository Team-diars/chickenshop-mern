import React, { useEffect, useState } from "react";
import { ModalBody, ModalFooter, Spinner } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getEmployeeByID, updateEmployee } from "../../actions/employee";
import { Link } from "react-router-dom";
import { Input, Select, Button, FormLabel } from "@chakra-ui/react";
import "../users/index.css";
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
            <div className="form-group" style={{width:"100%"}}>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={name}
                type="text"
                onChange={(e) => onChange(e)}
              />
              <FormLabel>Last Name</FormLabel>
              <Input
                name="lastname"
                type="text"
                value={lastname}
                onChange={(e) => onChange(e)}
              />
              <FormLabel>Role</FormLabel>
              <Select
                as="select"
                name="role"
                value={role}
                onChange={(e) => onChange(e)}
              >
                <option value="">-- Select a role --</option>
                <option value="admin">Admin</option>
                <option value="cashier">Cashier</option>
              </Select>
              <FormLabel>DNI</FormLabel>
              <Input
                name="dni"
                value={dni}
                type="text"
                onChange={(e) => onChange(e)}
              />
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={email}
                type="email"
                onChange={(e) => onChange(e)}
              />
              <FormLabel>Address</FormLabel>
              <Input
                name="address"
                value={address}
                type="text"
                onChange={(e) => onChange(e)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              colorScheme="blue"
              mr={3}
              onClick={() => updateEmployee(match.params.id, formData, history)}
            >
              Update
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
