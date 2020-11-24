import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { BiSearchAlt } from "react-icons/bi";
import useOnClickOutside from "./useOnClickOutside";

const data = require("../Header/country.json");

function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const [icon, setIcon] = useState(false);
  const [countryInput, setCountryInput] = useState("");
  const [filterCountries, setFilterCountries] = useState([]);
  // const [filterCities, setFilterCities] = useState([]);
  const inputRef = useRef(null); //reference for input box
  const ref = useRef(null); //reference for onclick outside

  const dropClass = dropdown ? "list" : "nolist";
  const iconClass = icon ? "rotateicon" : "norotate";

  useOnClickOutside(ref, () => {
    //using a custom hook to capture the click outside the component using useRef
    if (dropdown) {
      setDropdown(false);
      setIcon(false);
    }
  });

  console.log(dropdown);
  const clickHandler = () => {
    setDropdown(!dropdown);
    setIcon(!icon);
    inputRef.current.focus();
  };

  useEffect(() => {
    setFilterCountries(
      data
        .filter((d) => {
          return d.placeType.name === "Country";
        })
        .filter((da) => {
          return da.name.toLowerCase().includes(countryInput.toLowerCase());
        })
        .sort((a, b) => {
          if (a.name === b.name) {
            return 0;
          }
          return a.name > b.name ? 1 : -1;
        })
    );
    // setFilterCities(
    //     data.filter((d)=>{
    //         return d.placeType.code = 7;
    //     })
    // )
  }, [countryInput]);
  // console.log(filterCountries);
  // console.log('---------')
  // console.log(filterCities);
  // filterCities.map(c=>{
  //     return console.log(c.name)
  // })

  return (
    <nav className="nav">
      <h1 id="logo">LOGO</h1>
      <h1 onClick={clickHandler} className="country">
        Select Country
        <span>
          <IoIosArrowDropdown id="icondrop" className={iconClass} />
        </span>
      </h1>
      <ul
        className={dropClass}
        onClick={(e) => {
          return console.log(e.target.value);
        }}
        ref={ref}
      >
        <div className="searchContainer">
          <BiSearchAlt className="searchIcon" />
          <input
            ref={inputRef}
            type="text"
            value={countryInput}
            onChange={(e) => setCountryInput(e.target.value)}
            className="searchBox"
            placeholder="Search Country..."
          />
        </div>
        {filterCountries.map((d) => {
          return (
            <li className="list-items" key={d.woeid} value={d.woeid}>
              {d.name}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
