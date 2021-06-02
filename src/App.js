import "./App.css";
import Navbar from "./components/NavBar/Navbar.js";
import Footer from "./components/Footer/Footer.js";
import LandingPage from "./components/LandingPage/index";
import { GlobalContext } from "./global";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { HashLoader } from "react-spinners";
import { lazy, Suspense, useState } from "react";
import Faq from "./components/Faq/Faq";
import { useEffect, useContext } from "react";

const HashTagPromise = import("./components/Hashtag/Hashtag");
const AboutUsPromise = import("./components/AboutUs/AboutUs");
const HashTag = lazy(() => HashTagPromise);
const AboutUs = lazy(() => AboutUsPromise);

async function fetchPlace(country, setCountry_name, setCountry) {
  console.log('hello')
  const resp = await fetch("https://ipapi.co/json/", {
    method: "GET",
  });
  const data = await resp.json();
  console.log(data);
  setCountry(data.country_name || "Worldwide");
  setCountry_name(data.country_name || 'Worldwide');
  sessionStorage.setItem("country", data.country_name);
}

function App() {
  const {setCountry} = useContext(GlobalContext);
  const [country_name,setCountry_name] = useState(sessionStorage.getItem('country'));
  useEffect(() => {   
      if(sessionStorage.getItem('country') === null){
        fetchPlace(country_name, setCountry_name,setCountry);
      }
  }, [setCountry_name, country_name, setCountry]);

  return (
    <Router>
      <div id="body-container">
        <Navbar />
        <Switch>
          <Route exact path="/faq">
            <Suspense fallback={<HashLoader color="#00a2f5" />}>
              <Faq />
            </Suspense>
          </Route>
          <Route exact path="/aboutus">
            <Suspense fallback={<HashLoader color="#00a2f5" />}>
              <AboutUs />
            </Suspense>
          </Route>
          <Route exact path="/:country/:city?">
            <LandingPage />
          </Route>
          <Route path="/:country/:city?/trend/:hashtag">
            <Suspense fallback={<HashLoader color="#00a2f5" />}>
              <HashTag />
            </Suspense>
          </Route>
          <Route exact path="/">
          <Suspense fallback={<HashLoader color="#00a2f5" />}>
            {country_name !== null ? <Redirect to={`/${country_name }`} /> : <HashLoader color="#00a2f5" />}
          </Suspense>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


