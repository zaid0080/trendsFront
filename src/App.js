import './App.css';
import Navbar from './components/NavBar/Navbar.js';
import LandingPage from "./components/LandingPage/index";
import Footer from './components/Footer/Footer.js'

function App() {
  return (
    <div id='body-container'>
      <Navbar />
      <LandingPage />
      <Footer />
    </div >
  );
}

export default App;
