import React, { useContext } from 'react'
import { GlobalContext } from "../../global";
import './toggler.css'

function Toggler() {
  const {darkMode, setDarkMode} = useContext(GlobalContext);
    return (
        <div className='toggle-cont'>
            <div className='toggle-icon'>
                    <input type='checkbox' id='toggle' onClick={() => setDarkMode(!darkMode)} defaultChecked={darkMode ? true : false} />
            </div>
        </div>
    )
}

export default Toggler
