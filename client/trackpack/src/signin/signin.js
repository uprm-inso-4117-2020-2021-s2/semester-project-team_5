/*
signin.js (component for registration)
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

import { Button } from "@chakra-ui/button";

import "./signin.css";

class Signin extends Component {
  constructor() {
    super();

    this.onSignIn = this.onSignIn.bind(this);

    this.state = {
      name: "",
      email: "",
      password: "",
      errors: {},
    };
  }

  onSignIn = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
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
            <Heading color="white">
              Account
              <br />
              Creation
            </Heading>
          </Box>
          <Box my={4} textAlign="center">
            <form onSubmit={this.onSignIn}>
              <FormControl className="form-item">
                <FormLabel color="white">Name</FormLabel>
                <Input
                  id="name"
                  onChange={this.onChange}
                  value={this.state.name}
                  type="text"
                  className="form-input"
                />
              </FormControl>
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
                borderRadius="20px"
                color="white"
                backgroundColor="#2C148C"
              >
                Continue
              </Button>
            </form>
          </Box>
        </Box>
          <Flex flexDirection="column">
          <a>Already have an account?</a>
          <Button borderRadius="20px" color="white" backgroundColor="#2C148C" marginBottom="20px">
            Sign-In
          </Button>
        </Flex>
      </Flex>
    );
  }
}

export default Signin;
