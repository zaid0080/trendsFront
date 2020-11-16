import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { IoIosArrowDropdown } from 'react-icons/io'; 

const data  = require('../Header/country.json');

function Navbar() {
    const [dropdown, setDropdown] = useState(false);
    const [icon, setIcon] = useState(false);
    const [countryInput, setCountryInput] = useState('');
    const [filterCountries, setFilterCountries] = useState([]);

    const dropClass = dropdown ? 'list' : 'nolist';
    const iconClass = icon ? 'rotateicon' : 'norotate';
    
    const clickHandler = () => {
        setDropdown(!dropdown);
        setIcon(!icon);
    }

    useEffect(()=> {
        setFilterCountries(
            data.filter( d => {
                return d.name.toLowerCase().includes(countryInput.toLowerCase());
            })
        )
    }, [countryInput])

    // const filterlist = data.filter( d => {
    //     return d.name.toLowerCase().includes(countryInput.toLowerCase());
    // })
    
    return (
        <nav className='nav'>
            <h1 id='logo'>LOGO</h1>   
            <h1 onClick={clickHandler} className='country'>Select Country<span><IoIosArrowDropdown id='icondrop' className={iconClass}/></span></h1>
            <ul className={dropClass} onClick={e => {
                return console.log(e.target.value)
            }}>
                <input type='text' value={countryInput} onChange={e => setCountryInput(e.target.value)} className='searchBox' placeholder='Search Location..' />
                {filterCountries.map(d => {
                    return (
                        <li className='list-items' key={d.woeid} value={d.woeid}>{d.name}</li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Navbar
