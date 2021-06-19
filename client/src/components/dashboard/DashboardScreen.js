import React, { useEffect } from 'react'
import { Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';

const DashboardScreen = ({loadUser, auth:{user,loading}}) => {
  useEffect(() => {
    loadUser();
  },[loadUser])
  return (
    <div class="parent-dashboard container p-5" style={{background:'#90d1d8', borderRadius:'8px', border:"2px dashed #181818"}}>
      <h1>Profile</h1>
      <div className="d-flex col-md-12 profile-wrapper p-0">
      {
        loading || user === null ?
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> :
        <>
          <div className="image-profile-wrapper col-md-4 col-lg-4 col-sm-12 p-0">
            <Image src={user.avatar} rounded fluid thumbnail/>
          </div>
          <div className="info-user-wrapper col-md-8 col-lg-8 col-sm-12 p-0">
            <Col className="my-3 w-100 info-user">
              <p>Name: {user.name} {user.lastname}</p>
              <p>DNI: {user.dni}</p>
              <p>Role: {user.role}</p>
            </Col>
          </div>
        </>
      }
      </div>
    </div>
  )
}
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})
export default connect(mapStateToProps,{loadUser})(DashboardScreen)
