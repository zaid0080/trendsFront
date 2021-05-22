import React, { useContext } from 'react'
import { GlobalContext } from '../../global'
import {fetchAndSetData} from '../Content/Content';


function Trending() {
    const {city,country,setData, setTime} = useContext(GlobalContext);
    let sessionData = window.sessionStorage.getItem('data');
    if(sessionData === null){
        const query = city === undefined ? country : city;
        fetchAndSetData(query,setData,setTime);
        sessionData = window.sessionStorage.getItem('data');
    }
    const d = JSON.parse(sessionData);
    const trendData  = Object.values(d);
    console.log(trendData[1]);
    if(trendData){
        return (
            <div className='trending-container'>
                <p>Trending Now</p>      
                <ul>
                   {trendData[1].trends.map(d => <li key={d.index} >{d.name}</li>)}
                </ul>      
            </div>
        )
    } else {
        return null
    }
    
}

export default Trending
