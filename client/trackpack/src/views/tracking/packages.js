import React, { Component } from "react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "./packages.css";
import { BsSearch } from "react-icons/bs";
//import "../../components/package.css";
import Package from "../../components/package";
import AddPackageModal from "../../components/AddPackageModal/AddPackageModal";
import AddCategoryModal from "../../components/AddCategoryModal/AddCategoryModal";
import Category from "../../components/Category/Category";
import jwt_decode from "jwt-decode";
import axios from "axios";

class Packages extends Component {
  state = {
    isAddingPackage: false,
    isAddingCategory: false,
    categories: [],
  };

  componentDidMount() {
    const url = "http://localhost:5000";
    let userId = localStorage.jwtToken ? jwt_decode(localStorage.jwtToken).sub : undefined;
    if (userId) {
      let errorMessage;
      axios
        .get(url + "/users/" + userId + "/categories")
        .then((res) => {
          this.setState({ categories: res.data });
        })
        .catch((err) => {
          errorMessage = err.ressponse.data;
        });
    }
    console.log(this.state)
  }

  render() {
    return (
      <div className="content">
        <div className="options">
          {/* <li>
            <Link to="/TrackPackage">Track a package</Link>
          </li> */}

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
            <Link to="/orderInformation">Current Order</Link>
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
          <div className="categories">
            <Category
              categories={this.state.categories}
              packages={this.state.packages}
            ></Category>
          </div>
        </div>
        <div style={{ display: "flex" }} className="orderList">
          {/* <Package
              name="Huevos"
              deliveryDate="03/09/2021"
              status="In transit"
              category="Unlisted"
            />
            <Package
              name="Eggs"
              deliveryDate="04/05/2022"
              status="Arriving Tomorrow"
              category="Electronics"
            />
            <Package
              name="something"
              deliveryDate= "04/05/2022"
              status= "arriving tomorrow"
              category="Electronics"
              /> */}
          <AddPackageModal
            isAddingPackage={this.state.isAddingPackage}
            onClose={(isAddingPackage) => this.setState({ isAddingPackage })}
          />
          <AddCategoryModal
            isAddingCategory={this.state.isAddingCategory}
            onClose={(isAddingCategory) => this.setState({ isAddingCategory })}
          />
        </div>
      </div>
    );
  }
}

export default Packages;
