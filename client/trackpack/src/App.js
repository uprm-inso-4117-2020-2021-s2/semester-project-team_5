import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Topnav from "./components/Topnav";
import Signup from "./views/signup/signup";
import Signin from "./views/signin/signin";
import Packages from "./views/tracking/packages";
import Homepage from "./views/home/homepage";
import TrackPackage from "./views/track/trackPackage";
import OrderInfo from "./views/orderInformation/orderInfo";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  //set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  //De code token and get user info and exp
  const decoded = jwt_decode(token);
  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout
    localStorage.removeItem('jwtToken');
    //redirect to login
    window.location.href = "./signin";
  }
}

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
              <Packages />
            </Route>
            <Route path="/trackPackage">
              <TrackPackage />
            </Route>
            <Route path="/orderInformation">
              <OrderInfo />
            </Route>
          </Switch>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
