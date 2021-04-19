import React, { useState, useEffect, useRef, useContext } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { MdSearch } from "react-icons/md";
//import { BiSearchAlt } from "react-icons/bi";
//import useOnClickOutside from "../useClickOutside/useOnClickOutside";
import { GlobalContext } from "../../global";
import SideContainer from "./SideContainer";
import Hamburger from "./Hamburger";

const woeidList = require("../Header/countrys.json");

const woeidListTree = {};

woeidList.forEach((d) => {
  if (woeidListTree[d.country] === undefined) {
    woeidListTree[d.country] = [];
    woeidListTree[d.country].push(d);
  } else {
    woeidListTree[d.country].push(d);
  }
});



function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const [icon, setIcon] = useState(false);
  const [searchIcon, setSearchIcon] = useState(false);
  const [countryInput, setCountryInput] = useState("");
  const [filterCountries, setFilterCountries] = useState({});
  const [countryName, setCountryName] = useState("Worldwide");
  const inputRef = useRef(null); //reference for input box
  const dropRef = useRef(null); //reference for onclick outside
  const sideRef = useRef(null);


  const dropClass = dropdown ? "list" : "nolist";
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
    // inputBoxRef.current.focus();
  };

  const menuHandler = () => {
    sideRef.current.showMenu();
    console.log("it's working");
  };

  const handleChange = (e) => {
    setCountryInput(e.target.value);
    console.log(e.target.value);
  }

  const listItemHandler = (e) => {
    setCountryName(e.target.innerText);
    setDropdown(!dropdown);
    // console.log(countryName);
  }; 

  useEffect(() => {
    setFilterCountries(woeidListTree);
    // setFilterCountries(woeidListTree[d].filter((l) => l.name.toLowerCase().includes(countryInput.toLowerCase())  ));
  }, [countryInput]);

  return (
    <nav className="nav">
      <Hamburger clickMe={menuHandler} />
      <SideContainer ref={sideRef} />
      <h1 id="logo">alldaytrends</h1>
      <span></span>
      <h3 className="links">Login</h3>
      <h3 className="links">About Us</h3>
      <h3 className="links">Contact Us</h3>
      <div className="search-container">
        <input
          ref={inputRef}
          type="text"
          value={countryInput}
          className={searchClass}
          onChange={handleChange}
          placeholder={placeHold}
        />
        <MdSearch
          id="searchIcon"
          className={iconColor}
          onClick={searchHandler}
        />

        <ul
          className={`ul-list-items ${dropClass}`}
          onClick={(e) => {
            console.log(e.target.value);
            const woeidValue = e.target.value;
            if (woeidValue) {
              setWoeid(woeidValue);
            }
            setIcon(false);
          }}
          ref={dropRef}
        >
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
          {
            //console.log(Object.keys(woeidListTree))
            Object.keys(woeidListTree)
              .sort()
              .map((d) => {
                return (
                  <div className="cities">
                    <h2 className="countriesNames">{d}</h2>
                    {/* <span></span> */}
                    <hr />
                    <ul className="citiesNames">
                      {woeidListTree[d].map((l) => {
                        return <li>{l.name}</li>;
                      })}
                    </ul>
                  </div>
                );
              })
          }
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
