import React, { useContext } from 'react'
import { GlobalContext } from '../../global'



function Trending() {
    const {data} = useContext(GlobalContext);
    const trendData  = Object.values(data[0]);
    if(data){
        return (
            <div className='trending-container'>
                <p>Trending Now</p>      
                <ul>
                   {trendData[1].map(d => <li key={d.index} >{d.name}</li>)}
                </ul>      
            </div>
        )
    } else {
        return null
    }
    
}

export default Trending
