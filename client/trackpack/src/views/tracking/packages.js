import React, { Component } from "react";
import { Flex, Box, Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "./packages.css";
import { BsSearch } from "react-icons/bs";
import "../../components/package.css";

class Packages extends Component {
  state = {};

  render() {
    return (
      <div className="content">
        <div className="options">
          <li>
            <Link to="/signin">Order History</Link>
          </li>
          <li>
            <Link to="/signin">Current Order</Link>
          </li>
          <div className="searchContainer">
            <i className="magGlassIcon">
              <BsSearch />
            </i>
            <input
              type="search"
              placeholder="Search an order"
              className="searchBar"
            ></input>
          </div>
        </div>
        <div className="line"></div>
        <div className="orderContainer">
          <h1 className="htext">Current Orders:</h1>
          <div id="orderList">
            <div>{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Packages;
