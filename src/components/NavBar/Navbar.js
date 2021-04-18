import React, { useState, useEffect, useRef, useContext } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { BiSearchAlt } from "react-icons/bi";
import useOnClickOutside from "./useOnClickOutside";
import { GlobalContext } from "../../global";

const woeidList = require("../Header/countrys.json");


const woeidListTree = {};

woeidList.forEach((d)=>{
  if(woeidListTree[d.country] === undefined){
    woeidListTree[d.country] = [];
  }else {
      if(d.placeType.name === 'Town'){
        woeidListTree[d.country].push(d);
      }
  }
})

window.t = woeidListTree;

function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const [icon, setIcon] = useState(false);
  const [countryInput, setCountryInput] = useState("");
  const [filterCountries, setFilterCountries] = useState({});
  const [countryName, setCountryName] = useState("Worldwide");
  // const [filterCities, setFilterCities] = useState([]);
  const inputRef = useRef(null); //reference for input box
  const ref = useRef(null); //reference for onclick outside

  const dropClass = dropdown ? "list" : "nolist";
  const iconClass = icon ? "rotateicon" : "norotate";

  const [, setWoeid, ,] = useContext(GlobalContext);

  //using a custom hook to capture the click outside the component using useRef
  useOnClickOutside(ref, () => {
    if (dropdown) {
      setDropdown(false);
      setIcon(false);
    }
  });

  const clickHandler = () => {
    setDropdown(!dropdown);
    setIcon(!icon);
    inputRef.current.focus();
  };

  const listItemHandler = (e) => {
    setCountryName(e.target.innerText);
    setDropdown(!dropdown);
    // console.log(countryName);
  };

  useEffect(() => {
    setFilterCountries( woeidListTree);
  }, [countryInput]);

  return (
    <nav className="nav">
      <h1 id="logo">alldaytrends</h1>

      <h1 onClick={clickHandler} className="country">
        {" "}
        {countryName}
        <span>
          <IoMdArrowDropright id="icondrop" className={iconClass} />
        </span>
      </h1>

      <ul
        className={dropClass}
        onClick={(e) => {
          const woeidValue = e.target.value;
          if(woeidValue){
            setWoeid(woeidValue);
          }
          setIcon(false);
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
        {
          // console.log(Object.keys(woeidListTree))
          Object.keys(woeidListTree).map((d) =>{
            return (
              <div className="cities">
              <h5 >{d}</h5>
              <ul>
              {
                woeidListTree[d].map((l) => {
                  return <li>{l.name}</li>
                })
              }
              </ul>
              </div>
            )
          })
        }
      </ul>
    </nav>
  );
}

export default Navbar;
