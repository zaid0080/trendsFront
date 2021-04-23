import React from 'react';
import { Link } from "react-router-dom";


function Footer() {
    return (
        <div id='foot-container'>
            <Link to="/aboutus" className='foot-links'>About</Link>
            <Link to="/contactus" className='foot-links'>Contact</Link>  
        </div>
    )
}

export default Footer;
