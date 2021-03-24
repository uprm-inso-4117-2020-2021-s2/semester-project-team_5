import React, { Component } from "react";
import "./homepage.css";
import { Flex } from "@chakra-ui/react";
import people from "../assets/happy people.png";
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
        justifyContent="space-between"
        flexDirection="row"
        flexWrap="wrap"
      >
        <div>
          <img
            id="homeImage"
            src={people}
            alt=""
          />
        </div>

        <div class="about-container">
          <h2>About us</h2>
            <div className="aboutUs">  
            <p>TEXT</p>
            <div className="bottomBar"></div>
            </div>
        </div>
      </Flex>
    );
  }
}

export default Homepage;
