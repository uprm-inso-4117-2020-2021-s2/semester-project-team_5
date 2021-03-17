/*
signin.js (component for sign in)
*/

import React, { Component } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { signIn } from "./signin-service";

import { Button } from "@chakra-ui/button";
import { Link, withRouter } from "react-router-dom";

// import "./signup.css";

class Signin extends Component {
  constructor() {
    super();

    this.onSignIn = this.onSignIn.bind(this);

    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  onSignIn = (e) => {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password,
    };

    signIn(newUser); //Sign in user
    this.props.history.push("/"); //Redirect to homepage
  };

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    return (
      <Flex
        width="full"
        align="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Box className="form" p={2}>
          <Box textAlign="center">
            <Heading color="white">Sign In</Heading>
          </Box>
          <Box my={4} textAlign="center">
            <form onSubmit={this.onSignIn}>
              <FormControl className="form-item">
                <FormLabel color="white">E-mail</FormLabel>
                <Input
                  id="email"
                  onChange={this.onChange}
                  value={this.state.email}
                  type="email"
                  className="form-input"
                />
              </FormControl>
              <FormControl className="form-item">
                <FormLabel color="white">Password</FormLabel>
                <Input
                  id="password"
                  onChange={this.onChange}
                  value={this.state.password}
                  type="password"
                  className="form-input"
                />
              </FormControl>
              <Button
                type="submit"
                borderRadius="20px"
                color="white"
                backgroundColor="#2C148C"
              >
                Continue
              </Button>
            </form>
          </Box>
        </Box>
        <Flex paddingTop="20px" width="25vh" flexDirection="row" justifyContent="space-between">
          <a>No account?</a>
          <a>Or continue as</a>
        </Flex>
        <Flex width="25vh" flexDirection="row" justifyContent="space-between">
        <Button
            as={Link} exact to="/signup"
            borderRadius="20px"
            color="white"
            backgroundColor="#2C148C"
            marginBottom="20px"
          >
            Register
          </Button>
          <Button
          as={Link} exact to="/"
            borderRadius="20px"
            color="white"
            backgroundColor="#2C148C"
            marginBottom="20px"
            marginRight="12px"
          >
            Guest
          </Button>
        </Flex>
      </Flex>
    );
  }
}

export default withRouter(Signin);
