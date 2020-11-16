import React from 'react';
import { FaTwitter } from 'react-icons/fa';
import './header.css';
//const data  = require('./country.json');

// function logger(e){
//     console.log(e);
// }

function Header() {
    return (
        <div id='container'>
            <h3><span><FaTwitter /></span>The latest twitter trends in one place</h3>
            {/* <select className='drop-down' onClick={e => {
                return console.log(e.target.value)
            }}>
                {data.map(d => {
                    return (
                        <option className='drop-down-items' key={d.woeid} value={d.woeid}>{d.name}</option>
                    )
                })}
            </select> */}
        </div>
    )
}

export default Header
