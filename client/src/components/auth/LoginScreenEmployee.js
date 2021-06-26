import {connect} from 'react-redux';
import React from 'react'
import { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { auth } from '../../actions/auth'
import FormContainer from './FormContainer'

const LoginScreenEmployee = ({ auth, isAuthenticated }) => {
  const [formData,setFormData] = useState({
    email: '',
    password: '',
  });
  const {email,password} = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async(e) => {
    e.preventDefault();
    auth(email,password);
  }
  //* Redirect if logged in
  //* Login.js
  if(isAuthenticated){
    return <Redirect to="/profile"/>
  }
  return (
    <div className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
      <div className="col-md-6 col-12" style={{border:"2px dashed #181818", padding:"2rem", borderRadius:"8px",background:"#e2e2e2"}}>
        <div className="d-flex justify-content-between">
          <h1 style={{margin:0}}>Sign In</h1>
        </div>
        <Form onSubmit={e => onSubmit(e)}>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              name="email"
              value={email} onChange={e => onChange(e)} required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              name="password"
              value={password} onChange={e => onChange(e)} required
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  )
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps,{auth})(LoginScreenEmployee)