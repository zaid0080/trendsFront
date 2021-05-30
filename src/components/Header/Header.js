import React, { useContext } from 'react';
import { GlobalContext } from "../../global";
import Social from './Social.svg';

function Header() {
    const {country, city} = useContext(GlobalContext);
    return (
        <>
            <p className='page-title'>Top Twitter Trends in {city === undefined ? country : city}</p>
        <div id='header-container'>
            <h1 className='tag-line'>Know<span>What's</span><span>Trending?</span></h1>
            <img src={Social} width='726' height='494' alt='Social' className='head-image' />
        </div>
        </>
    )
}

export default Header
