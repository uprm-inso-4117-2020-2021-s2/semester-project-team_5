/*
signup.js (component for registration)
*/

import React, { Component } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { signUp, verifyData } from "./signup-service";

import {
  Button
} from "@chakra-ui/react";

import "./signup.css";
import AlertPopUp from "../../components/alertPopUp";
import { Link, withRouter } from "react-router-dom";

class Signup extends Component {
  constructor() {
    super();

    this.onSignUp = this.onSignUp.bind(this);
    this.okayRef = React.createRef();
    this.state = {
      username: "",
      email: "",
      password: "",
      popup: false,
      errors: {},
    };
  }

  onSignUp = async (e) => {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    this.setState({ errors: verifyData(newUser, this.state.errors) });

    if (Object.values(this.state.errors).length === 0) {
      let res = await signUp(newUser); //Register user
      if (res.message === "Success!") {
        this.setState({ popup: true });
      } else {
        const newErr = {
          message: res.message
        }
        this.setState({ errors : newErr })
      }
    }
  };

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  onClose = (e) => {
    this.setState({ popup: false });
    this.props.history.push("/");
  };

  render() {
    const { errors } = this.state;
    let activationAlert;
    if (this.state.popup) {
      activationAlert = (
        <AlertPopUp
        popup={this.state.popup}
        reference={this.okayRef}
        header="Acount Created! Activation Required"
        body="Check your email to activate your new account."
        buttonName="Okay"
        buttonColor="red"
        onClose={this.onClose}
        />
      );
    }
    return (
      <Flex
        width="full"
        align="center"
        justifyContent="center"
        flexDirection="column"
      >
        {activationAlert}
        <Box className="form" p={2}>
          <Box textAlign="center">
            <Heading color="white">
              Account
              <br />
              Creation
            </Heading>
          </Box>
          <Box my={4} textAlign="center">
            <form onSubmit={this.onSignUp}>
              <FormControl className="form-item">
                <Alert
                  hidden={!errors.message}
                  borderRadius="8px"
                  fontSize="x-small"
                  status="error"
                  marginBottom="8px"
                 >
                 <AlertIcon />
                 {errors.message}
                 </Alert>
                <FormLabel color="white">Username</FormLabel>
                <Alert
                  hidden={!errors.username}
                  borderRadius="8px"
                  fontSize="small"
                  status="error"
                  marginBottom="8px"
                >
                  <AlertIcon />
                  {errors.username}
                </Alert>
                <Input
                  id="username"
                  onChange={this.onChange}
                  value={this.state.username}
                  type="text"
                  className="form-input"
                  isInvalid={errors.username}
                />
              </FormControl>
              <FormControl className="form-item">
                <FormLabel color="white">E-mail</FormLabel>
                <Alert
                  hidden={!errors.email}
                  borderRadius="8px"
                  fontSize="small"
                  status="error"
                  marginBottom="8px"
                >
                  <AlertIcon />
                  {errors.email}
                </Alert>
                <Input
                  id="email"
                  onChange={this.onChange}
                  value={this.state.email}
                  type="text"
                  className="form-input"
                  isInvalid={errors.email}
                />
              </FormControl>
              <FormControl className="form-item">
                <FormLabel color="white">Password</FormLabel>
                <Alert
                  hidden={!errors.password}
                  borderRadius="8px"
                  fontSize="small"
                  status="error"
                  marginBottom="8px"
                >
                  <AlertIcon />
                  {errors.password}
                </Alert>
                <Input
                  id="password"
                  onChange={this.onChange}
                  value={this.state.password}
                  type="password"
                  className="form-input"
                  isInvalid={errors.password}
                />
              </FormControl>
              <Button
                type="submit"
                borderRadius="20px"
                color="white"
                backgroundColor="#7EBDC2"
              >
                Continue
              </Button>
            </form>
          </Box>
        </Box>
        <Flex flexDirection="column">
          <a>Already have an account?</a>
          <Button
            as={Link}
            exact
            to="/signin"
            borderRadius="20px"
            color="white"
            backgroundColor="#7EBDC2"
            marginBottom="20px"
          >
            Sign-In
          </Button>
          {/* <Button
            id="popup"
            value={!this.state.popup}
            onClick={this.onChange}
            borderRadius="20px"
            color="white"
            backgroundColor="#7EBDC2"
            marginBottom="20px"
          >
            PopUp
          </Button> */}
        </Flex>
      </Flex>
    );
  }
}

export default withRouter(Signup);
