import React, { Component } from "react";
import { Button, Flex } from "@chakra-ui/react";
import "./packages.css";
import { BsSearch } from "react-icons/bs";
import AddPackageModal from "../../components/AddPackageModal/AddPackageModal";
import AddCategoryModal from "../../components/AddCategoryModal/AddCategoryModal";
import Category from "../../components/Category/Category";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Loader from "../../components/Loader/Loader";

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
    }
  }

  render() {
    let content;
    if (this.state.loading) {
      content =<div style={{paddingTop: "30vh"}}> <Loader /> </div>;
    } else {
      content = (
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
              <a className="link" onClick={() => this.setState({ isInCurrentOrders: true })}>Current Orders</a>
            </li>
            <li>
              <a className="link" onClick={() => this.setState({ isInCurrentOrders: false })}>Order History</a>
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
        <div className="orderContainer">
        <h1 className="htext">Current Orders:</h1>
            <Category categories={this.state.categories}>
            </Category>
        </div>)
        }

        {!this.state.isInCurrentOrders && (
        <div className="orderContainer">
        <h1 className="htext">Order History:</h1>
            <Category categories={this.state.categories}>
            </Category>
        </div>)
        }
          <div style={{ display: "flex" }} className="orderList">
            <AddPackageModal
              isAddingPackage={this.state.isAddingPackage}
              onClose={(isAddingPackage) => this.setState({ isAddingPackage })}
            />
            <AddCategoryModal
              isAddingCategory={this.state.isAddingCategory}
              onClose={(isAddingCategory) =>
                this.setState({ isAddingCategory })
              }
            />
          </div>
        </div>
      );
    }
    return <div>{content}</div>;
  }
}

export default Packages;
