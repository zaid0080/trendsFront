import React, { useState, useEffect, useRef, useContext } from "react";
import { MdSearch } from "react-icons/md";
import useOnClickOutside from "../useClickOutside/useOnClickOutside";
import { GlobalContext } from "../../global";
import SideContainer from "./SideContainer";
import Hamburger from "./Hamburger";
import { Link } from 'react-router-dom';

const woeidList = require("../Header/countrys.json");

let woeidListTree = {};

function createTree(filterCountries){
  woeidListTree = {};
  filterCountries.forEach((d) => {
    if (woeidListTree[d.country] === undefined) {
      woeidListTree[d.country] = [];
      woeidListTree[d.country].push(d);
    } else {
      woeidListTree[d.country].push(d);
    }
  });
}

function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const [searchIcon, setSearchIcon] = useState(false);
  const [countryInput, setCountryInput] = useState("");
  const [filterCountries, setFilterCountries] = useState(woeidList);
  // const [countryName, setCountryName] = useState("Worldwide");
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

  useOnClickOutside(inputRef, () => {
    if (searchIcon) {
      setSearchIcon(false);
      setDropdown(false);
    }
  });

  // const clickHandler = () => {
  //   setDropdown(!dropdown);
  //   setIcon(!icon);
  //   inputRef.current.focus();
  // };

  const searchHandler = () => {
    setSearchIcon(!searchIcon);
    setDropdown(!dropdown);
    inputRef.current.focus();
  };

  const menuHandler = () => {
    sideRef.current.showMenu();
    console.log("it's working");
  };

  const handleChange = (e) => {
    if(e.target.value === ''){
      setCountryInput('');
    }
    setCountryInput(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    setFilterCountries(
      woeidList
        .filter(d => d.name.toLowerCase().includes( countryInput.toLowerCase() ) ) 
        .sort())
    createTree(filterCountries);
  }, [countryInput]);

  return (
    <nav className="nav">
      <Hamburger clickMe={menuHandler} />
      <SideContainer ref={sideRef} />
      <Link to="/" id="logo">alldaytrends.</Link>
      <span></span>
      <Link to="/aboutus" className="links">About</Link>

      <a href="https://twitter.com/login" target="_blank" rel="noopener noreferrer"  className="links">Login</a>

      <Link to = "contactus" className="links">Contact</Link>

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
          // ref={dropRef}
          //ref = {inputRef}
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
                    <hr />
                    <ul className="citiesNames">
                      {woeidListTree[d].map((l) => {
                        return <li value={l.woeid} onClick={(e) => {
                          const woeidValue = e.target.value;
                          console.log(e.target.value)
                          if (woeidValue) {
                            setWoeid(woeidValue);
                          }
                        }}>
                          {/* <Link className='c-name' to={`${l.name}`}> */}
                            {l.name}
                            {/* </Link> */}
                            </li>;
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
