import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Topnav from "./components/Topnav";
import Signup from "./views/signup/signup";
import Signin from "./views/signin/signin";
import Package from "./components/package";
import Packages from "./views/tracking/packages";
import Homepage from "./views/home/homepage";
import TrackPackage from "./views/track/trackPackage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <div>
          <Topnav />
          <Switch>
            <Route exact path="/">
              <Homepage title="Homepage" />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/signin">
              <Signin />
            </Route>
            <Route path="/packages">
              <Packages>
                <Package
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
              </Packages>
            </Route>
            <Route path="/trackPackage">
              <TrackPackage />
            </Route>
          </Switch>
          {/* <Footer/> */}
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
