import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import React, { Component } from "react";
import axios from "axios";

class Category extends Component {
  constructor() {
      super();
      this.state = {
        isHidden: true,
        packages: [],
        loading: true
      };
  }

  componentDidUpdate(prevProps, prevState) {
      console.log("hi")
      console.log(prevState)
      console.log(this.state.packages)
      if (this.state.packages === prevState.packages) {
        //   this.forceUpdate()
      }
  }

  componentDidMount = async() =>{
    let data = this.props.categories;
    let something;
    if (data.categories) {
        something = await Promise.all(data.categories.map(async (category) => {
          // this.renderPackages(category.category_id)
          const url = "http://localhost:5000";
          console.log(category.category_id);
          if (category.category_id) {
            let errorMessage;
            await axios
              .get(
                url + "/users/categories/" + category.category_id + "/packages"
              )
              .then((res) => {
                let packages= this.state.packages;
                packages.push(res.data);
                // console.log(res.data)
                // this.setState({packages: res.data});
                this.setState({packages: packages});
                this.setState({loading: false})
              })
              .catch((err) => {
                errorMessage = err.response;
              });
          }
        })).then((values) => {
            console.log(values);
        })
      }
      console.log(something)
      if(something) {
          
      }
      console.log("im here")
    //   this.setState({ loading: false} );
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
    // console.log(data.categories);
    // console.log(this.state.packages);
    if(data.categories){
        return data.categories.map( category => {
            let catPackages;
            catPackages = this.state.packages.filter(packageArray => {
                // console.log(packageArray)
                // console.log(packageArray.packages)
                let pack  = packageArray && packageArray.packages.length > 0? packageArray.packages[0].category_id: "";
                // console.log(pack)
                if(pack === category.category_id) {
                    return packageArray;
                }
                return null;
            });
            if (catPackages) {
                console.log(category.category_id, catPackages)
                return ( 
                    <React.Fragment>
                        <span key={category.id} style={{ display: "flex", fontSize: 40 }} > {category.name}</span>
                        {catPackages? this.renderPackages(catPackages): ""}
                    </React.Fragment>
                )
            }
        })
    }


    //       <React.Fragment>
    //         <span key={category.id} style={{ display: "flex", fontSize: 40 }}>
    //           {category.name}{" "}
    //         </span>
    //         {packages ? this.renderPackages(packages) : ""}
    //       </React.Fragment>

  }
  renderPackages(packagesArr) {
    console.log(packagesArr);
      return packagesArr.map(packages => {
          return packages.packages.map(pack => {
              return ( 
                      <a>{pack.name} {" "}</a>
              )
          })
      })
  }

  render() {
      console.log(this.state.loading)
    let categories;
    // if(this.state.loading) {
    //     console.log(this.state.packages)
    //     categories = (
    //         <a> Loading... </a>
    //     )
        // return (
        //     <a> Loading... </a>
        // )
    // } else {
        categories = this.renderCategories(this.props.categories);
    // }
    return (
      <div>
        {/* <p> hi</p> */}
        {categories}
      </div>
    );
  }
}

export default Category;
