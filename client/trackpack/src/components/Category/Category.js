import React, { Component } from "react";
import axios from "axios";
import "./Category.css";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

class Category extends Component {
  constructor() {
    super();
    this.state = {
      categoriesHidden: new Map(),
      packages: [],
      loading: true,
    };
  }

  componentDidMount() {
    let data = this.props.categories;
    let something;
    if (data.categories) {
      something = data.categories.map((category) => {
        const url = "http://localhost:5000";
        if (category.category_id) {
          let errorMessage;
          axios
            .get(
              url + "/categories/" + category.category_id + "/packages"
            )
            .then((res) => {
              let packages = this.state.packages;
              packages.push(res.data);
              this.setState({ packages: packages });
              this.setState({ loading: false });
            })
            .catch((err) => {
              errorMessage = err.response;
            });
        }
      });
    }
    this.setState({loading: false})
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
                  <span key={category.category_id} style={{marginLeft: "6vw"}}>{category.name}</span>

                  <button style={{marginLeft: "0.5vw"}} onClick={() =>{
                    let map = this.state.categoriesHidden
                    map[category.category_id] = !map[category.category_id]
                    this.setState({categorysHidden: map})
                    console.log(this.state.categorysHidden)
                  }}>
                      <span>
                        {this.state.categoriesHidden[category.category_id]  && (<BsFillCaretDownFill size="20px" />) }
                        {!this.state.categoriesHidden[category.category_id]  && (<BsFillCaretUpFill size="20px" />) }
                      </span>
                  </button>

              {catPackages ? this.renderPackages(catPackages) : ""}
            </React.Fragment>
          );
        }
      });
    }
  }
  renderPackages(packagesArr) {
    return packagesArr.map((packages) => {
      return packages.packages.map((pack) => {
        return  <div className={this.state.categoriesHidden[pack.category_id] ? "packageNoInfo" : "packageInfo"}>
        <div className="imageContainer">
          <img
            className="icon"
            src="https://static.thenounproject.com/png/20088-200.png"
            placeholder="stock image"
          ></img>
        </div>
        <div className="itemName">
          <span id="iName">{pack.name}</span>
        </div>
        <div className="itemInfo">
          <span className="iInfo">Estimated delivery date: {}</span>
          <span className="iInfo">Status: {}</span>
        </div>
      </div>;
      });
    });
  }

  render() {
    return (
      <div style={{padding: "10vw"}}>
        {this.renderCategories(this.props.categories)}
      </div>
    );
  }
}

export default Category;
