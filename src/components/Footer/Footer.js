import React from 'react';
import { IoLogoTwitter, IoLogoFacebook } from 'react-icons/io';
import { MdCopyright } from 'react-icons/md'
//import { Link } from "react-router-dom";


function Footer() {
    return (
       
            <div id='foots-container'>
            <div className='foot-tag'>
            <h2>alldaytrends.</h2>    
            <p>Copyright <MdCopyright /> alldaytrends.</p>
            </div>
            <div className='foot-linkss'>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Login</li>
            </ul>
            </div>
            <div className='logos'>
                <h3>Follow us</h3> 
                <IoLogoTwitter />   
                <IoLogoFacebook />
            </div>
            
             {/* <Link to="/aboutus" className='foot-links'>About</Link>
            <Link to="/contactus" className='foot-links'>Contact</Link>   */}
        </div>
    )
}

export default Footer;
