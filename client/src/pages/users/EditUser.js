import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, Spinner } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUserByID, updateUser } from "../../actions/user";
import { Link } from "react-router-dom";
import { FormLabel, Input, Select, Button, FormControl } from "@chakra-ui/react";
import "./index.css";

const EditUser = ({
  history,
  getUserByID,
  updateUser,
  user: { user, loading },
  match,
}) => {
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    lastname: "",
    dni: "",
    password: "",
    confirm_password: "",
  });
  const getUser = (id) => {
    getUserByID(id);
  };
  useEffect(() => {
    getUser(match.params.id);
  }, [match.params.id]);
  useEffect(() => {
    if (!loading && user) {
      setFormData({
        _id: match.params.id || "",
        name: user.name || "",
        lastname: user.lastname || "",
        dni: user.dni || "",
        password: "",
        confirm_password: "",
      });
    }
  }, [user, loading]);
  const onChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };
  return (
    <div style={{padding:"1rem"}}> 
      {loading ? (
        <div className="container p-5 d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
        </div>
      ) : (
        <div className="edit-wrapper">
          {/* <h1 style={{fontSize:"26px !important","color":"#424242"}}>Edit User</h1> */}
          <ModalBody style={{width:"100%",marginBottom:"1rem"}}>
            <FormControl className="form-group" style={{width:"100%"}}>
              <FormLabel>Employee</FormLabel>
              <Select
                as="select"
                name="role"
                onChange={(e) => onChange(e)}
                custom
                disabled
              >
                <option>
                  {formData.name} {formData.lastname} | {formData.dni}
                </option>
              </Select>
            </FormControl>
            <FormControl marginBottom="3">
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                name="password"
                value=""
                // value={formData.password}
                onChange={(e) => onChange(e)}
              />
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={(e) => onChange(e)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              type="submit"
              onClick={() => updateUser(match.params.id, formData, history)}
            >
              Guardar
            </Button>
            <Link to="/users" className="btn btn-danger">
              Cancel
            </Link>
          </ModalFooter>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});
EditUser.propTypes = {
  getUserByID: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, { getUserByID, updateUser })(EditUser);
