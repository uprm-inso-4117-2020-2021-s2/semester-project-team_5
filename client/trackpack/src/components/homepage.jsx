import React, { Component } from "react";
import Topnav from "./Topnav";
import "./homepage.css";
import { Flex, Box } from "@chakra-ui/react";
class Homepage extends Component {
  state = {
    about: "",
  };

  renderAboutUs() {
    if (this.state.about === "signIn") return null;
  }
  render() {
    return (
      <Flex
        width="full"
        align="center"
        justifyContent="center"
        flexDirection="column"
      >
        <section>
          <img
            className="homeImage"
            src="https://i.imgur.com/cwO8vQg.png"
            alt=""
          />
          <div className="aboutBox">
            <h2>About us</h2>
            <p className="aboutUs">TEXT</p>
            <div className="bottomBar"></div>
          </div>
        </section>
      </Flex>
    );
  }
}

export default Homepage;
