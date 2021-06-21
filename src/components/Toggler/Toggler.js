import React, { useContext } from 'react'
import { GlobalContext } from "../../global";
import './toggler.css'
// import { HiOutlineLightBulb } from 'react-icons/hi'
// import { IoMdCloudyNight  } from 'react-icons/io'

function Toggler() {
  const {darkMode, setDarkMode} = useContext(GlobalContext);
    return (
        <div className='toggle-cont'>
            <div className='toggle-icon'>
                    <input type='checkbox' id='toggle' onClick={() => setDarkMode(!darkMode)} checked={darkMode ? true : false} />
                    <label for='toggle' className='toggler'></label>
            </div>
        </div>
    )
}

export default Toggler
