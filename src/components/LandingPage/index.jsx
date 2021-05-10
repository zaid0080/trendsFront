import React from 'react'
import Header from '../Header/Header.js';
import Content from '../Content/Content.js';
import Tweet from '../Content/Tweet.js';
import Helmet from 'react-helmet';
//import Login from '../Login/Login.js';

export default function landingpage() {
    return (
        <div id = 'landing-page'>
            <Helmet>
            <title>All Day Trends</title>
        </Helmet>
         <Header />
         <Content />
         <Tweet />
      {/* <Login /> */}
        </div>
    )
}
