import "./App.css";
import Navbar from "./components/NavBar/Navbar.js";
import LandingPage from "./components/LandingPage/index";
import Footer from "./components/Footer/Footer.js";
import { GlobalProvider } from "./global";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AboutUs from "./components/AboutUs/AboutUs";

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
            <Route exact path="/">
              <LandingPage />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
