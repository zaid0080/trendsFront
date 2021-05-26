import React from "react";
import ADT from "../NavBar/logoTag.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div id="foots-container">
      <div className="logo-tag">
        <Link to="/">
          <img src={ADT} alt="Logo" height="35" width="200" />
        </Link>
      </div>
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/aboutus">About</Link>
        <a
          href="https://twitter.com/login?lang=en-gb"
          target="_blank"
          rel="noreferrer"
        >
          Login
        </a>
      </div>
    </div>
  );
}

export default Footer;