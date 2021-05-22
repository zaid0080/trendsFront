import React, { useContext } from 'react'
import { GlobalContext } from '../../global'



function Trending() {
    const {data} = useContext(GlobalContext);
    const trendData  = Object.values(data[0]);
    if(data){
        return (
            <>
                <p className='tt-tag'>Trending Now</p>      
                <ul className='tt-trends'>
                   {trendData[1].map(d => <li key={d.index} >{d.name}</li>)}
                </ul>      
            </>
        )
    } else {
        return null
    }
    
}

export default Trending
