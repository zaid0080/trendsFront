import React, { useState, useEffect, useRef, useContext } from "react";
import { MdSearch } from "react-icons/md";
import useOnClickOutside from "../useClickOutside/useOnClickOutside";
import { GlobalContext } from "../../global";
import SideContainer from "./SideContainer";
import Hamburger from "./Hamburger";
import { Link } from "react-router-dom";
import ADT from './adt..png'

const woeidList = require("../Header/countrys.json");

let woeidListTree = {};

function createTree(filterCountries) {
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
  const { country,city } = useContext(GlobalContext);
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

  const countryHandler = () => {
    setDropdown(!dropdown);
    setSearchIcon(!searchIcon);
  }

  const menuHandler = () => {
    sideRef.current.showMenu();
  };

  const handleChange = (e) => {
    setCountryInput(e.target.value);
  };

  useEffect(() => {
    setFilterCountries(
      woeidList
        .filter((d) =>
          d.name.toLowerCase().includes(countryInput.toLowerCase())
        )
        .sort()
    );
  }, [countryInput]);

  createTree(filterCountries);

  return (
    <nav className="nav">
      <Hamburger clickMe={menuHandler} />
      <SideContainer ref={sideRef} />
      <Link to="/">
      <img src={ADT} alt='logo' width='60' height='20' className='imgLogo'/>
      </Link>
      <Link to="/" id="logo">
        alldaytrends.
      </Link>
      <span></span>
      <p className={`links last-link `} onClick={countryHandler}>{country + (city === undefined ? '' : ','+ city)}</p>
      <p className={`cityMob ${searchIcon ? 'hideCountry' : ''}`}>{city === undefined ? country : city}</p>
      {/* <h3>{woeid}</h3> */}

      <div className="search-container">
          <input
            id='searchbar'
            ref={inputRef}
            type="text"
            value={countryInput}
            className={searchClass}
            onChange={handleChange}
            placeholder={placeHold}
          />
          <label></label>
        <MdSearch
          id="searchIcon"
          className={iconColor}
          onClick={searchHandler}
        />

        <ul className={`ul-list-items ${dropClass}`}>
          {Object.keys(woeidListTree)
            .sort()
            .map((d) => {
              return (
                <div className="cities" key={d}>
                  <h2 className="countriesNames">{d}</h2>
                  <hr />
                  <ul className="citiesNames">
                    {woeidListTree[d].reverse().map((l) => {
                      if (d !== l.name) {
                        return (
                          <li
                            value={l.name}
                            key={l.woeid}
                          >
                            <Link
                              className="c-name"
                              to={d !== "" ? `/${d}/${l.name}` : `/${l.name}`}
                              key={l.woeid}
                            >
                              {l.name}
                            </Link>
                          </li>
                        );
                      } else {
                        return (
                          <li
                            value={l.name}
                            key={l.woeid}
                          >
                            <Link
                              className="c-name"
                              to={`/${d}`}
                              key={l.woeid}
                            >
                              {l.name}
                            </Link>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              );
            })}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
