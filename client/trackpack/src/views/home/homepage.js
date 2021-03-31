import React, { Component } from "react";
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
      <div className="landPage">
        <img
          className="homeImage"
          src="https://i.imgur.com/cwO8vQg.png"
          alt=""
        />
        <div className="aboutBox">
          <span className="title"> ABOUT US</span>
          <p className="description">
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a
            arcu sem. Suspendisse potenti. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Mauris ut felis mattis, tempus libero
            nec, gravida est. Phasellus vitae tincidunt velit. Duis et nunc vel
            lorem commodo vulputate. Integer vel gravida turpis. Pellentesque
            orci est, vehicula eu sem vel, varius dictum nisl. Interdum et
            malesuada fames ac ante ipsum primis in faucibus. Curabitur
            vulputate auctor sapien sit amet aliquet. Morbi elit tortor,
            facilisis non arcu ac, tristique commodo metus. Nullam vestibulum
            eget purus vestibulum ultricies.
          </p>
          <div className="bottomBar"></div>
        </div>
      </div>
    );
  }
}

export default Homepage;
