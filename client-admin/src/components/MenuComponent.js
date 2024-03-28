import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';


class Menu extends Component {
  static contextType = MyContext;
  
  render() {
    
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/admin"><b>GAME LORD</b></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1"><Link to='/admin/home'>HOME</Link></Nav.Link>
              <Nav.Link href="#category"><Link to='/admin/category'>GENRE</Link></Nav.Link>
              <Nav.Link href="#product"><Link to='/admin/product'>PRODUCT</Link></Nav.Link>
              <Nav.Link href="#product"><Link to='/admin/order'>ORDER</Link></Nav.Link>
              <Nav.Link href="#product"><Link to='/admin/customer'>CUSTOMER</Link></Nav.Link>
            </Nav>
            
            <Nav>

              <NavDropdown title="Admin" id="basic-nav-dropdown">
              <Link to='/admin/home' onClick={() => this.lnkLogoutClick()}>Logout</Link>
              </NavDropdown>
                








          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }
}
export default Menu;