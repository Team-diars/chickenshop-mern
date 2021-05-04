import React from "react";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
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
      <Nav.Link href="/profile">
        <i className="fas fa-user"></i> Profile
      </Nav.Link>
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          <i className="fas fa-receipt"></i> Sale
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="/orders">Register Order</Dropdown.Item>
          <Dropdown.Item href="/sales">Generate Sale</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          <i className="fas fa-hammer"></i> Maintenance
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="/users">Users</Dropdown.Item>
          <Dropdown.Item href="/employees">Employees</Dropdown.Item>
          <Dropdown.Item href="/products">Products</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Nav.Link href="/settings">
        <i className="fas fa-cog"></i> Settings
      </Nav.Link>
      <Nav.Link href="/" onClick={logout} style={{color:'#DC3545'}}>
        <i className="fas fa-sign-out-alt"></i> Logout
      </Nav.Link>
    </>
  );
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' className="navbar-dark bg-primary" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Harike</Navbar.Brand>
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