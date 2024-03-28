import axios from 'axios';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { IoCart } from "react-icons/io5";
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';


class Menu extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="menu"><Link to={'/product/category/' + item._id}>{item.name}</Link></li>
      );
    });
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/"> GAME LORD </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className=" me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1" className='navitem'><Link to='/'>HOME</Link></Nav.Link>
              <NavDropdown title="GENRE" id="navbarScrollingDropdown" className='navitem'>
                <NavDropdown.Item href="#action2">
                        {cates}
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#ABOUT" className='navitem'>
              <Link to='/aboutus'>ABOUT US</Link>
              </Nav.Link>
              <Nav.Link href="MENU" className='navitem'>
              <Link to='/gmap'>MAP</Link>
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 keyword"
                aria-label="Search"
                value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }}
              />
              <Button variant="outline-success" value="SEARCH" onClick={(e) => this.btnSearchClick(e)}>Search</Button>
            </Form>
            <Nav>
                {this.context.token === '' ?
                <NavDropdown title="GUEST" id="basic-nav-dropdown">
                <NavDropdown.Item href="/login"><Link to='/login'>Login</Link></NavDropdown.Item>
                <NavDropdown.Item href="/signup"><Link to='/signup'>Sign-up</Link></NavDropdown.Item>
                <NavDropdown.Item href="/active"><Link to='/active'>Active</Link></NavDropdown.Item>
                </NavDropdown>
                :
                <NavDropdown title={this.context.customer.name} id="basic-nav-dropdown">
                <Link to='/myprofile'><NavDropdown.Item href="#action/3.2">My profile</NavDropdown.Item></Link>
                <Link to='/myorders'><NavDropdown.Item href="#action/3.3">My orders</NavDropdown.Item></Link>
                <Link to='/home' onClick={() => this.lnkLogoutClick()}><NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item></Link>
                </NavDropdown>
                }
                
                <Nav.Link href="#CART">
                <Link to='/mycart'><IoCart /> have <b>{this.context.mycart.length}</b> items</Link> 
                </Nav.Link>

          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  // event-handlers
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }

  componentDidMount() {
    this.apiGetCategories();
  }
  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
  }
}
export default withRouter(Menu);