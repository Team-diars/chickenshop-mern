import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Col, Row, Spinner, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import {getUsers} from '../../actions/user'
const UserScreen = ({getUsers, user:{users,loading}}) => {
  useEffect(()=>{
    getUsers();
  },[getUsers])
  
  return (loading) ?
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> :
      <>
      <Row className='align-items-center'>
        <Col>
          <h1>Users</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3 btn-success'>
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
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name} {user.lastname}</td>
                  <td>{user.email}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${user._id}/edit`}>
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
  user: state.user
})
export default connect(mapStateToProps,{getUsers})(UserScreen);