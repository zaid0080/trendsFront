import React, { useContext, useEffect } from 'react'
import { GlobalContext } from "../../global";
import './toggler.css'

function Toggler() {
  const {darkMode, setDarkMode} = useContext(GlobalContext);

  useEffect(() => {
    document.body.classList.add(darkMode ? 'dark-scroll' : 'light-scroll')
    document.body.classList.remove(!darkMode ? 'dark-scroll' : 'light-scroll')
  },[darkMode])
  
    return (
        <div className='toggle-cont'>
            <div className='toggle-icon'>
                    <input type='checkbox' id='toggle' onClick={() => setDarkMode(!darkMode)} defaultChecked={darkMode ? true : false} />
            </div>
        </div>
    )
}

export default Toggler
