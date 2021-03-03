import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Topnav from "./components/Topnav";
import Signup from "./views/signup/signup";
import Homepage from "./components/homepage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
   <Router>
      <div>
          <Topnav/>
          <Switch>
            <Route exact path="/">
              <Homepage title="Homepage"/>
            </Route>
            <Route path="/signup">
              <Signup/>
            </Route>
          </Switch>
          {/* <Footer/> */}
      </div>
    </Router>
  );
}
 
export default App;

