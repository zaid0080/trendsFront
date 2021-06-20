import React, { useContext } from 'react'
import { GlobalContext } from "../../global";
import './toggler.css'
// import { HiOutlineLightBulb } from 'react-icons/hi'
// import { IoMdCloudyNight  } from 'react-icons/io'

function Toggler() {
  const {darkMode, setDarkMode} = useContext(GlobalContext);

    return (
        <div className='toggle-cont'>
            <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
            <div className='toggle-icon'>
                
                    <input type='checkbox' id='toggle' onClick={() => setDarkMode(!darkMode)}/>
                    <label for='toggle' className='toggler'></label>
                {/* {darkMode ? <IoMdCloudyNight className='dark-icon'/> : <HiOutlineLightBulb className='light-icon' />} */}
                
                
            </div>
        </div>
    )
}

export default Toggler
