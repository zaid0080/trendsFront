import React from 'react'
import Header from '../Header/Header.js';
import Content from '../Content/Content.js';
import Tweet from '../Content/Tweet.js';
//import Login from '../Login/Login.js';

export default function landingpage() {
    return (
        <div id = 'landing-page'>
         <Header />
         <Content />
         <Tweet />
      {/* <Login /> */}
        </div>
    )
}
