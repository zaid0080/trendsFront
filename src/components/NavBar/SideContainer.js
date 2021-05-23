import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useRef,
} from "react";
import useOnClickOutside from "../useClickOutside/useOnClickOutside";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { AiFillTwitterSquare } from "react-icons/ai";
import { TiGroup } from "react-icons/ti";
import ADT from "./logoTag.png";

const sideContainer = forwardRef((props, ref) => {
  const [menu, setMenu] = useState(false);
  const Ref3 = useRef(null);
  const showMenu = () => {
    setMenu(!menu);
  };

  useOnClickOutside(Ref3, () => {
    if (menu) {
      setMenu(false);
    }
  });

  useImperativeHandle(ref, () => {
    return {
      showMenu: showMenu,
    };
  });

  return (
    <>
      <div className={`sideContainer ${menu ? "showMenu" : "hideMenu"}`}>
        <ul className="ul-nav-links">
          <p className="side-tag">
            <img
              src={ADT}
              alt="logo"
              width="250"
              height="50"
            />{" "}
            {/* alldaytrends. */}
          </p>
          <li className="nav-links">
            <FaHome className="home-icon" />
            <Link to="/">Home</Link>
          </li>
          <li className="nav-links">
            <TiGroup className="home-icon" />
            <Link to="/aboutus">About Us</Link>
          </li>
          <li className="nav-links">
            <AiFillTwitterSquare className="home-icon" />
            <a
              href="https://twitter.com/login?lang=en-gb"
              target="_blank"
              rel="noreferrer"
            >
              Login
            </a>
          </li>
        </ul>
      </div>
    </>
  );
});

export default sideContainer;
