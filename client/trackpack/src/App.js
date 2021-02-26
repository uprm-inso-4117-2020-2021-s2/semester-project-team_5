import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Topnav from "./components/Topnav";
import Signin from "./signin/signin";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <div className="App">
          <Topnav />
          <Route exact path="/signin" component={Signin} />
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
