import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import "./Topnav.css";
import { Navbar, Nav, Card } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

const onLogout = () => {
  localStorage.removeItem("jwtToken");
  
};

const Topnav = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    setInterval(() => {
      const userString = localStorage.getItem("jwtToken");
      const user = userString;
      setUser(user);
    }, [])
  }, 5000);

  let content;
  if (!user) {
    content = (
      <Nav className="mr-auto">
        {/* <Nav.Link as={Link} exact to="/packages">
          Tracking
        </Nav.Link> */}
        <Nav.Link as={Link} exact to="/signin">
          Sign in
        </Nav.Link>
        <Nav.Link as={Link} exact to="/signup">
          Sign up
        </Nav.Link>
      </Nav>
    );
  } else {
    content = (
      <Nav className="mr-auto">
        <Nav.Link as={Link} exact to="/packages">
          Tracking
        </Nav.Link>
        <Nav.Link as={Link} exact to="/signin" onClick={onLogout}>Logout</Nav.Link>
      </Nav>
    );
  }
  return (
    <Navbar collapseOnSelect expand="lg">
      <Nav.Link as={Link} exact to="/">
        <Card.Img src={logo} />
      </Nav.Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">{content}</Navbar.Collapse>
    </Navbar>
  );
};

export default Topnav;
