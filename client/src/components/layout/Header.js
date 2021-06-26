import React, { useEffect, useState } from "react";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import {logout,loadUser} from '../../actions/auth'
import {HeaderWebsite} from './HeaderWebsite'
const Header = ({loadUser,auth: {user,isAuthenticated, loading},logout}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(!isOpen);
  const GuestNavbar = (
    <header className="header-website">
      <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <div className="full">
                        <a className="logo" href="/"><img src="/images-website/logo.png" alt="#" /></a>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="full">
                        <div className="right_header_info">
                            <ul>
                                <li className="dinone">Contact Us : <img style={{marginRight: "15px",marginLeft: "15px"}} src="/images-website/phone_icon.png" alt="#"/>
                                <a href="#">987-654-3210</a>
                                </li>
                                <li className="dinone">
                                  <img style={{marginRight: "15px"}} src="/images-website/mail_icon.png" alt="#"/>
                                  <a href="#">demo@gmail.com</a>
                                </li>
                                <li className="dinone">
                                  <img style={{marginRight: "15px",height: "21px", position: "relative", top: "-2px"}} src="/images-website/location_icon.png" alt="#"/>
                                  <a href="#">104 New york , USA</a>
                                </li>
                                <li className="button_user">
                                  <a className="button active" href="/auth">Login</a>
                                  <a className="button" href="#">Register</a>
                                </li>
                                <li>
                                  <img style={{marginRight: "15px"}} src="/images-website/search_icon.png" alt="#"/>
                                </li>
                                <li>
                                    <button type="button" id="sidebarCollapse" onClick={handleOpen}>
                                        <img src="/images-website/menu_icon.png" alt="#"/>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </header>
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
    (!loading) && !isAuthenticated ? <HeaderWebsite/> : (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' className="navbar-dark bg-primary" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Harike</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
            {
              (!loading) &&
              isAuthenticated && user && (user.role === 'admin') ? AdminNavbar : CashierNavbar
            }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
    )
  )
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps,{logout,loadUser})(Header);