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
      <h1>Dashboard</h1>
      <p>{user.user.name}</p>
    </>
    
}
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})
export default connect(mapStateToProps,{loadUser})(DashboardScreen)
