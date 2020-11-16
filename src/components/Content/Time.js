import React from 'react';
import './time.css';

function Time() {
    const times = [1, 2, 3, 4, 5, 6];
    return (
        <div id='time-container'>
            <ul className='list-item'>
                {times.map((time,index) => {
                    return (
                        <li key={index}>{time} Hour Ago</li>
                    )
                })}
            </ul>    
        </div>
    )
}

export default Time
