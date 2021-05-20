import React,{useContext} from 'react'
import Header from '../Header/Header.js';
import Content from '../Content/Content.js';
//import Tweet from '../Content/Tweet.js';
import Helmet from 'react-helmet';
import { useParams } from 'react-router';
//import Login from '../Login/Login.js';
import {GlobalContext} from '../../global';

export default function Landingpage() {
    const context = useContext(GlobalContext);
    console.log(context);
    const x = useParams();
    console.log(x);
    return (
        <div id = 'landing-page'>
        <Helmet>
            <title>All Day Trends</title>
        </Helmet>
         <Header />
         <Content />
         {/* <Tweet /> */}
      {/* <Login /> */}
        </div>
    )
}
