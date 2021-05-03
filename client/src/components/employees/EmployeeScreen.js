import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Col, Form, ModalBody, ModalFooter, Row, Spinner, Table } from 'react-bootstrap';
import {Modal} from 'reactstrap'
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { connect } from 'react-redux';
import {getEmployees,deleteEmployee,addEmployee} from '../../actions/employee'
import PropTypes from 'prop-types'
const EmployeeScreen = ({getEmployees,addEmployee,deleteEmployee, employee:{employees,loading}}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ formData, setFormData ] = useState({
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
  const handleOpen = () => setIsOpen(!isOpen);
  const submitEmployee = () => {
    addEmployee({ name, lastname, role, dni, email, address });
    setFormData({ name:'', lastname: '', role:'', dni: '', email:'', address: ''});
    setIsOpen(!isOpen);
  }
  useEffect(()=>{
    getEmployees();
  },[getEmployees])
  console.log(isOpen);
  const onChange = e => setFormData({ ...formData,
    [e.target.name]:e.target.value
  });
  return (
      <>
      <Row className='align-items-center'>
        <Col>
          <h1>Employees</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3 btn-success' onClick={handleOpen}>
            <i className='fas fa-plus'></i> Register Employee
          </Button>
        </Col>
      </Row>
        <div className="d-flex justify-content-center align-items-center">
          {
            (loading) ? 
            <Spinner animation="border" role="status">
                    <span className="sr-only"></span>
            </Spinner> :
            <Table striped bordered hover responsive className='table-sm '>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>ROLE</th>
                  <th>DNI</th>
                  <th>EMAIL</th>
                  <th>ADDRESS</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee._id}</td>
                    <td>{employee.name} {employee.lastname}</td>
                    <td>{employee.role}</td>
                    <td>{employee.dni}</td>
                    <td>{employee.email}</td>
                    <td>{employee.address}</td>
                    <td>
                      <LinkContainer to={`/employees/edit/${employee._id}`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={e => deleteEmployee(employee._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          }
        </div>
        <Modal isOpen={isOpen}>
          <ModalHeader>Add Employee</ModalHeader>
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
            <button className="btn btn-primary" 
                    onClick={submitEmployee}
            >Insert</button>
            <button className="btn btn-danger" 
                    onClick={handleOpen}
            >Cancel</button>
          </ModalFooter>
      </Modal>
    </>
  )
}
const mapStateToProps = state => ({
  employee: state.employee,
})
EmployeeScreen.propTypes = {
  getEmployees: PropTypes.func.isRequired,
  addEmployee: PropTypes.func.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
}
export default connect(mapStateToProps,{getEmployees,addEmployee,deleteEmployee})(EmployeeScreen);