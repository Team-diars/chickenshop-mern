import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Col, Row, Spinner, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import {getEmployees} from '../../actions/employee'
const EmployeeScreen = ({getEmployees, employee:{employees,loading}}) => {
  useEffect(()=>{
    getEmployees();
  },[getEmployees])
  console.log(employees)
  return (loading) ?
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> :
      <>
      <Row className='align-items-center'>
        <Col>
          <h1>Employees</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3 btn-success'>
            <i className='fas fa-plus'></i> Register Employee
          </Button>
        </Col>
      </Row>
        <>
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
                    <LinkContainer to={`/admin/product/${employee._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
    </>
  
}
const mapStateToProps = state => ({
  employee: state.employee
})
export default connect(mapStateToProps,{getEmployees})(EmployeeScreen);