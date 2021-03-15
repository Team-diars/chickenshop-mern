import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';

const DashboardScreen = ({loadUser, auth:{user,loading}}) => {
  useEffect(() => {
    loadUser();
  },[loadUser])
  console.log({user,loading});
  return loading && user === null ?
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner> :
    <>
      <h1>Menu</h1>
      <img src={user.avatar} className="rounded" alt="User Avatar"/>
      <p>User: {user.name} {user.lastname}</p>
      <p>DNI: {user.dni}</p>
      <p>Role: {user.role}</p>
    </>
    
}
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})
export default connect(mapStateToProps,{loadUser})(DashboardScreen)
