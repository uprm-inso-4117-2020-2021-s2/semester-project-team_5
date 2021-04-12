import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import React, { Component } from "react";
import axios from "axios";

class Category extends Component {
  constructor() {
    super();
    this.state = {
      isHidden: true,
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
              url + "/users/categories/" + category.category_id + "/packages"
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

  //  hideView = () => {
  //     setHidden(!isHidden);
  //     if (isHidden) {
  //       setIcon(<BsFillCaretDownFill size="20px" />);
  //     } else {
  //       setIcon(<BsFillCaretUpFill size="20px" />);
  //     }
  //   };

  // renderPackages(packages) {
  //     packages.map( catPackage => {
  //         return (
  //             console.log(catPackage.name)
  //             // <span> {catPackage.name}</span>
  //         )
  //     })
  // }

  // getPackages = async() => {

  // }

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
              <span key={category.id} style={{ display: "flex", fontSize: 40 }}>
                {" "}
                {category.name}
              </span>
              {catPackages ? this.renderPackages(catPackages) : ""}
            </React.Fragment>
          );
        }
      });
    }

    //       <React.Fragment>
    //         <span key={category.id} style={{ display: "flex", fontSize: 40 }}>
    //           {category.name}{" "}
    //         </span>
    //         {packages ? this.renderPackages(packages) : ""}
    //       </React.Fragment>
  }
  renderPackages(packagesArr) {
    return packagesArr.map((packages) => {
      return packages.packages.map((pack) => {
        return <a>{pack.name} </a>;
      });
    });
  }

  render() {
    return (
      <div>
        {this.renderCategories(this.props.categories)}
      </div>
    );
  }
}

export default Category;
