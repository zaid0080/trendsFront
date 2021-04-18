import React, { forwardRef, useState, useImperativeHandle, useRef } from "react";
import useClickOutside from "../useClickOutside/useClickOutside";

const sideContainer = forwardRef((props, ref) => {
  const [menu, setMenu] = useState(false);
  const Ref3 = useRef(null);
  const showMenu = () => {
    setMenu(!menu);
  };

  useClickOutside(Ref3, () => {
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
      <div className={`sideContainer ${menu ? 'showMenu' : 'hideMenu'}`} ref={Ref3}>
        <li className='nav-links'>About us</li>
        <li className='nav-links'>Contact Us</li>
        <li className='nav-links'>Feedback</li>
      </div>
    </>
  );
});

export default sideContainer;
