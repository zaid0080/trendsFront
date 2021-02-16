import React, { useRef, useState } from "react";
import "./Hamburger.css";
import useOnClickOutside from "./useOnClickOutside";

function Hamburger(props) {
  const [hamb, setHamb] = useState(false);
  const hambRef = useRef(null);

  const hamHandler = () => {
    setHamb(!hamb);
    props.clickMe();
  };

  useOnClickOutside(hambRef, () => {
    if (hamb) {
      setHamb(false);
    }
  });

  return (
    <div
      className={`menu-btn ${hamb ? "showCross" : "hideCross"}`}
      onClick={hamHandler}
      ref={hambRef}
    >
      <div className="menu-btn__burger"></div>
    </div>
  );
}

export default Hamburger;
