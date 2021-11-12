import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, Spinner } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUserByID, updateUser } from "../../actions/user";
import { Link } from "react-router-dom";
import { FormLabel, Input, Select, Button } from "@chakra-ui/react";
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
        password: user.password || "",
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
            <div className="form-group" style={{width:"100%"}}>
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
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value=""
                onChange={(e) => onChange(e)}
              />
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                name="password"
                value=""
                onChange={(e) => onChange(e)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              colorScheme="blue"
              mr={3}
              onClick={() => updateUser(match.params.id, formData, history)}
            >
              Update
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
