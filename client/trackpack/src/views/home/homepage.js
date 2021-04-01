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
          <img
            id="homeImage"
            src={people}
            alt=""
          />
        </div>

        <div class="about-container">
          <h2>About us</h2>
            <div className="aboutUs">  
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
            <div className="bottomBar"></div>
            </div>
        </div>
      </Flex>
    );
  }
}

export default Homepage;