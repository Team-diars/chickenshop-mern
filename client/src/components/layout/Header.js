import React, { useEffect } from "react";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import {logout,loadUser} from '../../actions/auth'
import { Spinner } from 'react-bootstrap';
const Header = ({loadUser,auth: {user,isAuthenticated, loading},logout}) => {
  console.log('userInfo > ',user)
  const GuestNavbar = (
    <>
      <Nav.Link href="/cart"><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
      <Nav.Link href="/auth"><i className='fas fa-user'></i> Sign In</Nav.Link>
    </>
  )
  
  const AdminNavbar = (
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
      <Nav.Link href="/auth" onClick={logout} style={{color:'#DC3545'}}>
        <i className="fas fa-sign-out-alt"></i> Logout
      </Nav.Link>
    </>
  );
  const CashierNavbar = <>
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
    <Nav.Link href="/auth" onClick={logout} style={{color:'#DC3545'}}>
      <i className="fas fa-sign-out-alt"></i> Logout
    </Nav.Link>
  </>
  useEffect(() => {
    loadUser();
  },[loadUser])
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' className="navbar-dark bg-primary" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Harike</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
            {
              (!loading) &&
              isAuthenticated && user ? (user.role === 'admin') ? AdminNavbar : CashierNavbar : GuestNavbar
            }
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

export default connect(mapStateToProps,{logout,loadUser})(Header);