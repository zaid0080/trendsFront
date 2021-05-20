import "./App.css";
import Navbar from "./components/NavBar/Navbar.js";
import LandingPage from "./components/LandingPage/index";
import Footer from "./components/Footer/Footer.js";
import { GlobalProvider } from "./global";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {HashLoader} from 'react-spinners';
import {lazy, Suspense} from 'react';
const HashTag = lazy(()=> import ("./components/Hashtag/Hashtag") );
const AboutUs = lazy(() => import("./components/AboutUs/AboutUs") );

function App() {

  return (
    <GlobalProvider>
      <Router>
        <div id="body-container">
          <Navbar />
          <Switch>
            <Route exact path="/aboutus">
            <Suspense fallback={  <HashLoader color='#00a2f5' />}>
              <AboutUs />
              </Suspense>
            </Route>
            <Route exact path="/:country/:city?">
              <LandingPage />
            </Route>
            <Route path="/:country/:city?/trend/:hashtag">
            <Suspense fallback={  <HashLoader color='#00a2f5' />}>
              <HashTag/>
            </Suspense>
            </Route>
            <Route exact path="/">
              <Redirect to="/Worldwide"/>
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
