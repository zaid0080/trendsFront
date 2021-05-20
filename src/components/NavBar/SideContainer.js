import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useRef,
} from "react";
import useOnClickOutside from "../useClickOutside/useOnClickOutside";
import { Link } from "react-router-dom";

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
        <ul>
          <li className="nav-links">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-links">
            <Link to="/aboutus">About Us</Link>
          </li>
          <li className="nav-links">Login</li>
        </ul>
      </div>
    </>
  );
});

export default sideContainer;
