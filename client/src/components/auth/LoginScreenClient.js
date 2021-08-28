import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormContainer from './FormContainer'

const LoginScreenClient = ({ location, history }) => {
  return (
    <FormContainer>
      <div className="d-flex justify-content-between">
        <h1 style={{margin:0}}>Sign In</h1>
        <Link to={'/auth'} className="d-flex align-items-center justify-content-center" style={{textDecoration:'none'}}>
          <Button type='button' variant='primary'>
            Employee <i className='fas fa-user'></i>
          </Button>
        </Link>
      </div>
      <Form>
        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={'/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreenClient