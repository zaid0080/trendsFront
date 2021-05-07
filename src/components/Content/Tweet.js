import React, { useContext } from 'react';
import { GlobalContext } from "../../global";
import { findDuration } from './Time';
import './tweet.css';

function Tweet() {
    const [, , data,] = useContext(GlobalContext);
    console.log(data);
    return (
        <div className='trends-cont'>
            {data.map((d, index) => {
                return (
                    <>  
                        <div className='card'>
                        <h4 data-time={d._id}>{findDuration(d._id)}</h4>
                        <ol>
                            {d.trends.map((t) => {
                                return <li key={t.index}> {t.name} </li>
                            })}
                        </ol>
                        </div>
                        
                    </>
                )
            })}
        </div>
    )
}

export default Tweet
