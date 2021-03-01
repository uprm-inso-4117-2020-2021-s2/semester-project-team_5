import React from 'react'
import logo from '../assets/logo.png'
import './Topnav.css'
import { Navbar, Nav, Card } from 'react-bootstrap';

const Topnav = () => {
    return     <Navbar className="myNavbar">
    <Navbar.Brand href="#home"><Card.Img variant="top" id = "navbar_logo" src={logo} /></Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link id="link">Tracking</Nav.Link>
        <Nav.Link id="link">Sign In</Nav.Link>
      </Nav>
  </Navbar>
}

export default Topnav;