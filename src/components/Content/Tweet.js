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
                                if(t.tweet_volume > 0) {
                                    return <li key={t.index}> {t.name} <small>{t.tweet_volume}</small> </li>
                                }
                                return  (
                                    <>
                                        <li key={t.index}> {t.name} </li>
                                        
                                    </>
                                )
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
