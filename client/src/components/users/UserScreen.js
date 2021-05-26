import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Col, Form, ModalBody, ModalFooter, Row, Spinner, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import {getUsers,addUser,deleteUser} from '../../actions/user'
import {getEmployees} from '../../actions/employee'
import {Input, Modal} from 'reactstrap'
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import PropTypes from 'prop-types';

const UserScreen = ({getUsers,addUser,deleteUser,getEmployees,employee:{employees,loading:loading_emp}, user:{users,loading}}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ formData, setFormData ] = useState({
    password:"",
    employee:""
  });
  const {
    employee,
    password,
  } = formData;
  const handleOpen = () => setIsOpen(!isOpen);
  
  const submitUser = () => {
    addUser({employee,password});
    setFormData({employee:'',password:''});
    setIsOpen(!isOpen);
  }
  useEffect(()=>{
    getUsers();
  },[getUsers]);
  useEffect(()=>{
    getEmployees();
  },[getEmployees]);
  const onChange = e => {
    const { name, value, type } = e.target;
    setFormData({ 
      ...formData,
      [name]:type === "number" ? parseInt(value) : value
    });
  }
  console.log('Employees > ',employees);
  return (loading && loading_emp) ?
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> :
      <>
      <Row className='align-items-center'>
        <Col>
          <h1>Users</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3 btn-success' onClick={handleOpen}>
            <i className='fas fa-plus'></i> Register User
          </Button>
        </Col>
      </Row>
        <>
          <Table striped bordered hover responsive className='table-sm '>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
              users.map((user,idx) => (
                  <tr key={idx}>
                    <td>{user._id}</td>
                    <td>{user.name} {user.lastname}</td>
                    <td>{user.email}</td>
                    <td>
                      <LinkContainer to={`/users/edit/${user.coduser}`}>
                        <Button variant='warning' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteUser(user.coduser)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
              ))
              }
            </tbody>
          </Table>
        </>
        <Modal isOpen={isOpen}>
        <ModalHeader>Add User</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Employee</label>
            <br/>
            <Input name="employee" type="select" className="form-control" onChange={(e) => onChange(e)} value={employee}>
              <option value="">Select an employee</option>
              {
                employees.map((emp) => (
                  (emp.coduser===null) &&
                  <option key={emp._id} value={emp._id}>{emp.lastname} {emp.name} | {emp.dni}</option>
                ))
              }
            </Input>
          </div>
          <div className="form-group">
            <label>Password</label>
            <br/>
            <Form.Control name="password" value={password} type="password" onChange={(e) => onChange(e)}/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={submitUser}
          >Insert</button>
          <button className="btn btn-danger" 
                  onClick={handleOpen}
          >Cancel</button>
        </ModalFooter>
      </Modal>
    </>
  
}
const mapStateToProps = state => ({
  user: state.user,
  employee: state.employee
})
UserScreen.propTypes = {
  addUser: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  getEmployees: PropTypes.func.isRequired,
  deleteUser:PropTypes.func.isRequired,
}
export default connect(mapStateToProps,{getUsers,addUser,deleteUser,getEmployees})(UserScreen);