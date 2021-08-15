import "./App.css";
import Navbar from "./Components/NavBar/Navbar";
import Footer from "./Components/Footer/Footer";
import LandingPage from "./Pages/LandingPage/index";
import { GlobalContext } from "./global";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Hashloader from './Components/HashLoader/Hashloader'
import { lazy, Suspense, useState } from "react";
import Faq from "./Pages/Faq/Faq";
import { useEffect, useContext } from "react";
import Toggler from "./Components/Toggler/Toggler";
import { GetUserLocation } from "./utils/userUtils";

const HashTagPromise = import("./Pages/Hashtag/Hashtag");
const AboutUsPromise = import("./Pages/AboutUs/AboutUs");
const HashTag = lazy(() => HashTagPromise);
const AboutUs = lazy(() => AboutUsPromise);


function App() {
  const {state,dispatch} = useContext(GlobalContext);

  useEffect( () => {   
      if(sessionStorage.getItem('country') === null){
        (async () => {
          const place = await GetUserLocation();
          console.log(place)
          dispatch({
            type: "SET_PLACE",
            place: place
          })
        })()
      }
  }, []);

  return (
    <Router>
      <div id="body-container" className={state.darkMode ? 'dark' : ''}>
        <Navbar />
        <Toggler />
        <Switch>
          <Route exact path="/faq">
            <Suspense fallback={<Hashloader />}>
              <Faq />
            </Suspense>
          </Route>
          <Route exact path="/aboutus">
            <Suspense fallback={<Hashloader />}>
              <AboutUs />
            </Suspense>
          </Route>
          <Route exact path="/:country/:city?">
            <LandingPage />
          </Route>
          <Route path="/:country/:city?/trend/:hashtag">
            <Suspense fallback={<Hashloader  />}>
              <HashTag />
            </Suspense>
          </Route>
          <Route exact path="/">
          <Suspense fallback={<Hashloader />}>
            {state.place  ? <Redirect to={`/${state.place }`} /> : <Hashloader />}
          </Suspense>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


