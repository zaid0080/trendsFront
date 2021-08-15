import React, { useContext } from 'react';
import { GlobalContext } from "../../global";
import Social from './Social.svg';

function Header() {
    const {state} = useContext(GlobalContext);
    return (
        <>
            <h1 className={`page-title ${state.darkMode ? 'dark-text' : 'light-text' }`}>Top Twitter Trends - {state.place}</h1>
        <div id='header-container'>
            <h2 className={`tag-line ${state.darkMode ? 'dark-text' : 'light-text'}`}>Know<span>What's</span><span>Trending?</span></h2>
            <img src={Social} width='726' height='494' alt='Social' className='head-image' />
        </div>
        </>
    )
}

export default Header
