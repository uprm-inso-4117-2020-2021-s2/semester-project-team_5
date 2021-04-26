import React, { Component } from "react";
import "./homepage.css";
import { Flex } from "@chakra-ui/react";
import people from "../../assets/happy people.png";
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
          <img id="homeImage" src={people} alt="" />
        </div>

        <div class="about-container">
          <h2>About us</h2>
          <div className="aboutUs">
            Our goal with TrackPack is to provide a free to use web-application
            where users can in organized way add their current packages that
            have shipped and are bought from different online stores in a single
            easy to use and organized place.
            <div className="bottomBar"></div>
          </div>
        </div>
      </Flex>
    );
  }
}

export default Homepage;
