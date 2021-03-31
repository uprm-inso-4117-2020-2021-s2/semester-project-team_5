import React from 'react';
import logo from '../assets/logo.png';
import './Topnav.css';
import { Navbar, Nav, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Topnav = () => {
  return     <Navbar collapseOnSelect expand = "lg">
  <Nav.Link as={Link} exact to="/"><Card.Img src={logo}/></Nav.Link>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link>Tracking</Nav.Link>
      <Nav.Link as={Link} exact to="/signin">Sign in</Nav.Link>
      <Nav.Link as={Link} exact to="/signup">Sign up</Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Navbar>
}

export default Topnav;