import React, { Component } from "react";
import { IconPickerItem } from "react-fa-icon-picker";
import axios from "axios";
import "./Category.css";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import Loader from "../Loader/Loader";

class Category extends Component {
  constructor() {
    super();
    this.state = {
      categoriesHidden: new Map(),
      packages: [],
      loading: true,
    };
  }

  async componentDidMount() {
    console.log(this.props, "After calling componentDidMount");
    let data = await this.props.categories;
    // console.log("got props", this.props.categories);
    let something;
    if (data.categories) {
      something = await Promise.all(
        data.categories.map(async (category) => {
          const url = "http://localhost:5000";
          if (category.category_id) {
            let errorMessage;
            await axios
              .get(url + "/categories/" + category.category_id + "/packages")
              .then(async (res) => {
                let packages = this.state.packages;

                let modifiedValues = res.data;

                for (let i = 0; i < res.data.packages.length; i++) {
                  let pack = res.data.packages[i];
                  let statuses = await axios
                    .get(
                      url +
                        "/packages/" +
                        pack.package_id +
                        "/packages-statuses"
                    )
                    .then((res) => {
                      pack.status = res.data.statuses[0];
                      modifiedValues[i] = pack;
                    });
                }

                packages.push(modifiedValues);

                this.setState({ packages: packages });
              })
              .catch((err) => {
                errorMessage = err.response;
              });
          }
        })
      );
    }
    this.setState({ loading: false });
  }

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  renderCategories(data) {
    if (data.categories) {
      return data.categories.map((category) => {
        let catPackages;
        catPackages = this.state.packages.filter((packageArray) => {
          let pack =
            packageArray && packageArray.packages.length > 0
              ? packageArray.packages[0].category_id
              : "";
          if (pack === category.category_id) {
            return packageArray;
          }
          return null;
        });
        if (catPackages) {
          return (
            <React.Fragment>
              <Flex flexDir="column" justify="flex-start">
                <Box>
                  <span style={{ color: "white" }} key={category.category_id}>
                    {category.name}
                  </span>

                  <button
                    style={{ marginLeft: "0.5vw" }}
                    onClick={() => {
                      let map = this.state.categoriesHidden;
                      map[category.category_id] = !map[category.category_id];
                      this.setState({ categorysHidden: map });
                    }}
                  >
                    <span>
                      {this.state.categoriesHidden[category.category_id] && (
                        <BsFillCaretDownFill size="20px" />
                      )}
                      {!this.state.categoriesHidden[category.category_id] && (
                        <BsFillCaretUpFill size="20px" />
                      )}
                    </span>
                  </button>
                </Box>
                {catPackages ? this.renderPackages(catPackages) : ""}
              </Flex>
            </React.Fragment>
          );
        }
      });
    }
  }

  renderPackages(packagesArr) {
    return packagesArr.map((packages) => {
      return packages.packages.map((pack) => {
        let date = pack.status ? this.convert(pack.status.date) : "";
        let description = pack.status ? pack.status.description : "";

        return (
          <div
            className={
              this.state.categoriesHidden[pack.category_id]
                ? "packageNoInfo"
                : "packageInfo"
            }
          >
            <div className="imageContainer">
              <IconPickerItem
                icon={pack.image_name}
                size={50}
                color="	#ffffff"
              />
            </div>
            <div className="itemName">
              <span id="iName">{pack.name}</span>
            </div>
            <div className="itemInfo">
              <span className="iInfo">Latest status update: {date}</span>
              <span className="iInfo">Status: {description}</span>
            </div>
          </div>
        );
      });
    });
  }

  render() {
    let content;
    if (this.state.loading) {
      content = <Loader />;
    } else {
      content = (
        <div className="orderContainer">
          <Box d="flex" justifyContent="center">
            <Heading className="htext">{this.props.heading}:</Heading>
          </Box>
          <div style={{ padding: "5vw" }}>
            {this.renderCategories(this.props.categories)}
          </div>
        </div>
      );
    }

    return <div>{content}</div>;
  }
}

export default Category;
