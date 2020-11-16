import './App.css';
import Navbar from './components/NavBar/Navbar.js';
import Header from './components/Header/Header.js';
import Content from './components/Content/Content.js';
import Login from './components/Login/Login.js';
import Footer from './components/Footer/Footer.js'

function App() {
  return (
    <>
      <Navbar /> 
      <Header />
      <Content />
      <Login />
      <Footer />
    </>
  );
}

export default App;
