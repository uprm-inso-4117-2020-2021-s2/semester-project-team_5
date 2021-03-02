import React, { Component, Box } from "react";
import Topnav from "./Topnav";
import "./homepage.css";

class Homepage extends Component {
  state = {
    about: "",
  };

  renderAboutUs() {
    if (this.state.about === "signIn") return null;
  }
  render() {
    return (
      <body>
        <Topnav />
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
      </body>
    );
  }
}

export default Homepage;
