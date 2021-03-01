import React from 'react'
import logo from '../assets/logo.png'
import './Topnav.css'
import { Navbar, Nav, Card } from 'react-bootstrap';

const Topnav = () => {
    return     <Navbar collapseOnSelect expand = "lg">
    <Nav.Link><Card.Img src={logo}/></Nav.Link>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link>Tracking</Nav.Link>
        <Nav.Link>Sign In</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
}

export default Topnav;