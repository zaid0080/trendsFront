import './App.css';
import Navbar from './components/NavBar/Navbar.js';
import LandingPage from "./components/LandingPage/index";
import Footer from './components/Footer/Footer.js'
import { GlobalProvider } from './global';

function App() {
  return (
    <GlobalProvider>
    <div id='body-container'>
      <Navbar />
      <LandingPage />
      <Footer />
    </div >
    </GlobalProvider>
    )
}

export default App;
