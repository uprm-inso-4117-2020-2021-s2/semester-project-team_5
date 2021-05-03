import React, { Component } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import "./packages.css";
import { BsSearch } from "react-icons/bs";
import AddPackageModal from "../../components/AddPackageModal/AddPackageModal";
import AddCategoryModal from "../../components/AddCategoryModal/AddCategoryModal";
import Category from "../../components/Category/Category";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import { Heading } from "@chakra-ui/react";

class Packages extends Component {
  state = {
    isAddingPackage: false,
    isAddingCategory: false,
    isInCurrentOrders: true,
    categories: [],
    loading: true,
  };

  async componentDidMount() {
    const url = "http://localhost:5000";
    let userId = localStorage.jwtToken
      ? jwt_decode(localStorage.jwtToken).sub
      : undefined;
    if (userId) {
      let errorMessage;
      await axios
        .get(url + "/users/" + userId + "/categories")
        .then((res) => {
          this.setState({ categories: res.data });
        })
        .catch((err) => {
          errorMessage = err.ressponse.data;
        });
      this.setState({ loading: false });
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    let content;
    let renderContent;
    if (this.state.loading) {
      content = (
        <div style={{ paddingTop: "30vh" }}>
          {" "}
          <Loader />{" "}
        </div>
      );
    }
    renderContent = (
      <div className="content">
        <div className="options">
          <li>
            <Button onClick={() => this.setState({ isAddingPackage: true })}>
              {" "}
              Track a Package{" "}
            </Button>
          </li>
          <li>
            <Button onClick={() => this.setState({ isAddingCategory: true })}>
              {" "}
              Create a Category
            </Button>
          </li>

          <li>
            <a
              className="link"
              onClick={() => this.setState({ isInCurrentOrders: true })}
            >
              Current Orders
            </a>
          </li>
          <li>
            <a
              className="link"
              onClick={() => this.setState({ isInCurrentOrders: false })}
            >
              Order History
            </a>
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

        {this.state.isInCurrentOrders && (
            <Flex flexDir="row">
              <Category categories={this.state.categories} isInCurrentOrders={true} heading="Current Orders"></Category>
            </Flex>
        )}

        {!this.state.isInCurrentOrders && (
          <div>
            <Category categories={this.state.categories} isInCurrentOrders={false} heading="Order History"></Category>
           </div>
        )}
        <div style={{ display: "flex" }} className="orderList">
          <AddPackageModal
            isAddingPackage={this.state.isAddingPackage}
            onClose={(isAddingPackage) => this.setState({ isAddingPackage })}
            categories={this.state.categories.categories}
          />
          <AddCategoryModal
            isAddingCategory={this.state.isAddingCategory}
            onClose={(isAddingCategory) => this.setState({ isAddingCategory })}
            userId={jwt_decode(localStorage.jwtToken).sub}
            categories={this.state.categories.categories}
          />
        </div>
      </div>
    );

    return <div>{content ? content : renderContent}</div>;
  }
}

export default Packages;
