import React, { useContext, useEffect } from 'react'
import { GlobalContext } from "../../global";
import './toggler.css'

function Toggler() {
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    document.body.classList.add(state.darkMode ? 'dark-scroll' : 'light-scroll')
    document.body.classList.remove(!state.darkMode ? 'dark-scroll' : 'light-scroll')
  }, [state.darkMode])

  return (
    <div className='toggle-cont'>
      <div className='toggle-icon'>
        <input type='checkbox' id='toggle' onClick={() => 
          dispatch({
            type: "SWITCH_THEME",
            color : ! state.darkMode
          })
        } defaultChecked={state.darkMode} />
      </div>
    </div>
  )
}

export default Toggler
