import React, { useState, useEffect, useRef, useContext } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { MdSearch } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import useOnClickOutside from "../useClickOutside/useOnClickOutside";
import { GlobalContext } from "../../global";
import SideContainer from "./SideContainer";
import Hamburger from "./Hamburger";

const woeidList = require("../Header/countrys.json");

function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const [icon, setIcon] = useState(false);
  const [searchIcon, setSearchIcon] = useState(false);
  const [countryInput, setCountryInput] = useState("");
  const [filterCountries, setFilterCountries] = useState([]);
  const [countryName, setCountryName] = useState("Worldwide");
  // const [filterCities, setFilterCities] = useState([]);
  const inputRef = useRef(null); //reference for input box
  const dropRef = useRef(null); //reference for onclick outside
  const sideRef = useRef(null);
  const inputBoxRef = useRef(null);

  const dropClass = dropdown ? "list" : "nolist";
  const iconClass = icon ? "rotateicon" : "norotate";
  const searchClass = searchIcon ? "showSearch" : "noSearch";
  const placeHold = searchIcon ? "Search Country..." : " ";
  const iconColor = searchIcon ? "black" : "white";

  const [, setWoeid, ,] = useContext(GlobalContext);

  // let arr =  woeidList.filter( d => d.placeType.name === "Country" && d.parentid === 1)
  // console.log(arr)

  //using a custom hook to capture the click outside the component using useRef
  // useOnClickOutside(dropRef, () => {
  //   if (dropdown) {
  //     setDropdown(false);
  //     setIcon(false);
  //   }
  // });

  // useOnClickOutside(inputRef, () => {
  //   if (searchIcon) {
  //     setSearchIcon(false);
  //   }
  // });

  const clickHandler = () => {
    setDropdown(!dropdown);
    setIcon(!icon);
    //inputRef.current.focus();
  };

  const searchHandler = () => {
    setSearchIcon(!searchIcon);
    setDropdown(!dropdown);
    inputBoxRef.current.focus();
  };

  const menuHandler = () => {
    sideRef.current.showMenu();
    console.log("it's working");
  };

  const listItemHandler = (e) => {
    setCountryName(e.target.innerText);
    setDropdown(!dropdown);
    // console.log(countryName);
  };

  useEffect(() => {
    setFilterCountries(
      woeidList
        .filter(
          (d) =>
            d.placeType.name === "Country" || d.placeType.name === "Supername" || d.placeType.name === "Town"
        )
        .filter((d) =>
          d.name.toLowerCase().includes(countryInput.toLowerCase())
        )
        .sort()

    );
  }, [countryInput]);

  return (
    <nav className="nav">
      <Hamburger clickMe={menuHandler} />
      <SideContainer ref={sideRef} />
      <h1 id="logo">alldaytrends</h1>
      <span></span>
      <h3 className='links'>Login</h3>
      <h3 className='links'>About Us</h3>
      <h3 className='links'>Contact Us</h3>
      <h1 onClick={clickHandler} className="country">
        <span className="countryName">
          {" "}
          {countryName}
          <IoMdArrowDropright id="icondrop" className={iconClass} />
        </span>
      </h1>
      <div className="search-container">
        <input
          ref={inputBoxRef}
          type="text"
          className={searchClass}
          onChange = {(e) => setCountryInput(e.target.value)}
          placeholder={placeHold}
        />
        <MdSearch
          id="searchIcon"
          className={iconColor}
          onClick={searchHandler}
        />
      </div>

      <ul
        className={`ul-list-items ${dropClass}`}
        onClick={(e) => {
          const woeidValue = e.target.value;
          if(woeidValue){
            setWoeid(woeidValue);
          }
          setIcon(false);
        }}
        ref={dropRef}
      >
        {filterCountries.map((d) => {
          return (
            <li
              className="list-items"
              key={d.woeid}
              value={d.woeid}
              onClick={listItemHandler}
            >
              <ul>
                <li>{d.name}</li>
              </ul>
            </li>
          );
        })}
      </ul>
      {/* <div className="searchContainer">
          <BiSearchAlt className="searchIcon" />
          <input
            ref={inputRef}
            type="text"
            value={countryInput}
            onChange={(e) => setCountryInput(e.target.value)}
            className="searchBox"
            placeholder="Search Country..."
          />
        </div> */}
    </nav>
  );
}

export default Navbar;
