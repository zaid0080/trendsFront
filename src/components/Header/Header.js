import React from 'react';
import Social from './Social.svg';

function Header() {
    return (
        <div id='header-container'>
            <h1 className='tag-line'>Know<span>What's</span><span>Trending?</span></h1>
            <img src={Social} alt='Social' className='head-image' width={725.85572} height={493.82563}/>
        </div>
    )
}

export default Header
