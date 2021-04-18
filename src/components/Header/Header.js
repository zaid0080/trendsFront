import React from 'react';
//import { FaTwitter } from 'react-icons/fa';
import Social from './Social.svg';

function Header() {
    return (
        <div id='header-container'>
            <h1 className='tag-line'>Know<span>What's</span><span>Trending?</span></h1>
            <img src={Social} alt='Social' className='head-image' />
        </div>
    )
}

export default Header
