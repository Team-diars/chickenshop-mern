import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import {logout} from '../../actions/auth'
const Header = ({auth: {isAuthenticated, loading},logout}) => {
  const guestNavbar = (
    <>
      <Nav.Link href="/cart"><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
      <Nav.Link href="/login"><i className='fas fa-user'></i> Sign In</Nav.Link>
    </>
  )
  const EmployeeNavbar = (
    <>
      <Nav.Link href="/cart"><i className="fas fa-sign-out-alt"></i> Logout</Nav.Link>
    </>
  );
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' className="navbar-dark bg-primary" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
            {(!loading) && (
              isAuthenticated ? 
                EmployeeNavbar : guestNavbar
            )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps,{logout})(Header);