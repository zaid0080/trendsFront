import "./App.css";
import Navbar from "./components/NavBar/Navbar.js";
import LandingPage from "./components/LandingPage/index";
import Footer from "./components/Footer/Footer.js";
import { GlobalProvider } from "./global";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import AboutUs from "./components/AboutUs/AboutUs";
import Hashtag from "./components/Hashtag/Hashtag"; 

function App() {

  return (
    <GlobalProvider>
      <Router>
        <div id="body-container">
          <Navbar />
          <Switch>
            <Route path="/aboutus">
              <AboutUs />
            </Route>
            <Route path="/trend/:hashtag">
              <Hashtag/>
            </Route>
            <Route path="/:country">
              <LandingPage />
            </Route>
            <Route path="/">
              <Redirect to="/WorldWide" />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
