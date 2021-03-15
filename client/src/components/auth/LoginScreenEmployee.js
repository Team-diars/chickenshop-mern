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
    <FormContainer>
      <Row className="d-flex justify-content-between">
        <h1 style={{margin:0}}>Sign In</h1>
        <Link to={'/login'} className="d-flex align-items-center justify-content-center" style={{textDecoration:'none'}}>
          <Button type='button' variant='warning'>
            Client <i className='fas fa-user'></i>
          </Button>
        </Link>
      </Row>
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
    </FormContainer>
  )
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps,{auth})(LoginScreenEmployee)