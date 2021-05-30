import "./App.css";
import Navbar from "./components/NavBar/Navbar.js";
import Footer from "./components/Footer/Footer.js";
import LandingPage  from "./components/LandingPage/index";
import { GlobalProvider } from "./global";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import { HashLoader } from 'react-spinners';
import {lazy, Suspense} from 'react';
import Faq from './components/Faq/Faq';

const HashTagPromise = import ("./components/Hashtag/Hashtag");
const AboutUsPromise = import("./components/AboutUs/AboutUs")
const HashTag = lazy(()=> HashTagPromise);
const AboutUs = lazy(() => AboutUsPromise);


function App() {
  return (
    <GlobalProvider>
      <Router>
        <div id="body-container">
          <Navbar />
          <Switch>
          <Route exact path="/faq">
              <Suspense fallback={  <HashLoader color='#00a2f5' />}>
              <Faq />
              </Suspense>
            </Route>
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
              <Redirect to="/India"/>
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
