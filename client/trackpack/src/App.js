import logo from './logo.svg';
import React, {Component} from "react";
import './App.css';
import Topnav from './components/Topnav';
import HomeP from './components/homepage';
//import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  //state = {  }
  render() { 
    return (
      <React.Fragment>
      <Topnav />
      <HomeP/>
      </React.Fragment>
    );
  }
}
 
export default App;

