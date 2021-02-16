import React from 'react';
//import { FaTwitter } from 'react-icons/fa';
import Social from './Social.svg';

function Header() {
    return (
        <div id='header-container'>
            <img src={Social} alt='Social' className='head-image' />
            <h1 className='tag-line'>What's<span>Trending</span></h1>
        </div>
    )
}

export default Header
