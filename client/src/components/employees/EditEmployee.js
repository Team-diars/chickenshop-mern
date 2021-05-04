import React, { useEffect, useState } from 'react'
import {Button, Form, ModalBody, ModalFooter, Spinner } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {getEmployeeByID,updateEmployee} from '../../actions/employee'
import { Link } from 'react-router-dom';

function EditEmployee({history, getEmployeeByID, updateEmployee, employee:{employee,loading},match}) {
  const [ formData, setFormData ] = useState({
    _id: null,
    name:'',
    lastname: '',
    dni: '',
    address: '',
    email:'',
    role:'',
  });
  const {
    name,
    lastname,
    dni,
    address,
    email,
    role,
  } = formData;
  const getEmployee = (id) =>{
    getEmployeeByID(id);
  }
  useEffect(()=>{
    getEmployee(match.params.id);
  },[match.params.id]);
  useEffect(() => {
    if(!loading && employee){
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
  },[employee,loading]);
  const onChange = e => {
    const { name, value, type } = e.target;
    setFormData({ 
      ...formData,
      [name]:type === "number" ? parseInt(value) : value
    });
  }
  return (
    <>
      <ModalHeader>Edit Employee</ModalHeader>
      {
        (loading) ? 
          <div className="container p-5 d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status">
              <span className="sr-only"></span>
            </Spinner>
          </div> :
          <>
            <ModalBody>
              <div className="form-group">
                <label>Name</label>
                <br/>
                <Form.Control name="name" value={name}  type="text" onChange={(e) => onChange(e)}/>
                <label>Last Name</label>
                <br/>
                <Form.Control name="lastname" type="text" value={lastname} onChange={(e) => onChange(e)}/>
                <label>Role</label>
                <br/>
                <Form.Control as="select" 
                              size="sm" 
                              name="role"
                              value={role}
                              onChange={(e) => onChange(e)}
                              custom 
                              >
                  <option value="">-- Select a role --</option>
                  <option value="admin">Admin</option>
                  <option value="cashier">Cashier</option>
                </Form.Control>
                <label>DNI</label>
                <br/>
                <Form.Control name="dni" value={dni}  type="text" onChange={(e) => onChange(e)}/>
                <label>Email</label>
                <br/>
                <Form.Control name="email" value={email}  type="email" onChange={(e) => onChange(e)}/>
                <label>Address</label>
                <br/>
                <Form.Control name="address" value={address}  type="text" onChange={(e) => onChange(e)}/>
              </div>
            </ModalBody>
          <ModalFooter>
            <Button
                type="submit"
                variant='warning'
                className='btn'
                onClick={() => updateEmployee(match.params.id,formData,history)}
                >
                  Update
            </Button>
            <Link to="/employees" className="btn btn-danger">
              Cancel
            </Link>
          </ModalFooter>
        </>
      }
    </>
  )
}
const mapStateToProps = state => ({
  employee: state.employee
})
EditEmployee.propTypes = {
  getEmployeeByID: PropTypes.func.isRequired,
  updateEmployee: PropTypes.func.isRequired,
}
export default connect(mapStateToProps,{getEmployeeByID, updateEmployee})(EditEmployee)

