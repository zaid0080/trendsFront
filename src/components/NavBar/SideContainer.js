import React, { forwardRef, useState, useImperativeHandle } from "react";
import useOnClickOutside from "./useOnClickOutside";

const sideContainer = forwardRef((props, ref) => {
  const [menu, setMenu] = useState(false);
  const showMenu = () => {
    setMenu(!menu);
  };

  useOnClickOutside(forwardRef, () => {
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
      <div className={`sideContainer ${menu ? 'showMenu' : 'hideMenu'}`} ref={ref}>
        <li className='nav-links'>About us</li>
        <li className='nav-links'>Contact Us</li>
        <li className='nav-links'>Feedback</li>
      </div>
    </>
  );
});

export default sideContainer;
