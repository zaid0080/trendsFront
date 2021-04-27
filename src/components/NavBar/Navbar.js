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
  const inputRef = useRef(null); //reference for input box
  const sideRef = useRef(null);

  const dropClass = dropdown ? "list" : "nolist";
  const searchClass = searchIcon ? "showSearch" : "noSearch";
  const placeHold = searchIcon ? "Search Country..." : " ";
  const iconColor = searchIcon ? "black" : "white";

  const [, setWoeid, ,] = useContext(GlobalContext);

  useOnClickOutside(inputRef, () => {
    if (searchIcon) {
      setSearchIcon(false);
      setDropdown(false);
    }
  });

  const searchHandler = () => {
    setSearchIcon(!searchIcon);
    setDropdown(!dropdown);
    inputRef.current.focus();
  };

  const menuHandler = () => {
    sideRef.current.showMenu();
    console.log("it's working");
  };


  const handleChange =  e => {
    setCountryInput(e.target.value);
  };

  useEffect(() => { 
    setFilterCountries(
      woeidList
        .filter(d => d.name.toLowerCase().includes( countryInput.toLowerCase() ) ) 
        .sort())
  }, [countryInput]);

  createTree(filterCountries);

  return (
    <nav className="nav">
      <Hamburger clickMe={menuHandler} />
      <SideContainer ref={sideRef} />
      <Link to="/" id="logo">alldaytrends.</Link>
      <span></span>
      <Link to = "/" className="links">Home</Link>
      <Link to="/aboutus" className="links">About</Link>

      <a href="https://twitter.com/login" target="_blank" rel="noopener noreferrer"  className="links">Login</a>

     

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
        >
  
          {
            Object.keys(woeidListTree)
              .sort()
              .map((d) => {
                return (
                  <div className="cities">
                    <h2 className="countriesNames">{d}</h2>
                    <hr />
                    <ul className="citiesNames">
                      {woeidListTree[d].map((l) => {
                        return <li value={l.woeid} key={l.woeid} onClick={(e) => {
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
