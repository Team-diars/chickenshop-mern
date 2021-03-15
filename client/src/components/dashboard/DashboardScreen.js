import React, { useEffect } from 'react'
import { Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';

const DashboardScreen = ({loadUser, auth:{user,loading}}) => {
  useEffect(() => {
    loadUser();
  },[loadUser])
  return loading || user === null ?
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner> :
    <Container style={{background:'#90d1d8', borderRadius:'10px'}}>
      <h1>Profile</h1>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Image src={user.avatar} rounded fluid thumbnail/>
        <Row>
          <Col className="my-3 w-100">
            <p>Name: {user.name} {user.lastname}</p>
            <p>DNI: {user.dni}</p>
            <p>Role: {user.role}</p>
          </Col>
        </Row>
      </div>
    </Container>
    
}
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})
export default connect(mapStateToProps,{loadUser})(DashboardScreen)
