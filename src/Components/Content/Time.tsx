import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../global";

export function findDuration(date) {
  const now = Date.now();
  const minseconds = 1000 * 60;
  const then = +new Date(date);
  const diff = now - then;
  const min = diff / minseconds;
  
  if (min > 60) {
    return `${Math.floor(min / 60)} hrs ${Math.floor(min % 60)} mins ago`;
  }
  if (min <= 5) {
    return `few min ago`;
  }
  return `${Math.floor(min)} min ago`;
}

function Time() {
  const ctx = useContext(GlobalContext);
  useEffect(() => {}, [ctx.state.selectedTime]);

  return (
    <div id="time-container">
      <ul
        className={`list-item ${ctx.state.darkMode ? 'dark-nav' : ''}`}
        onClick={(e) => {
          if(e.target instanceof HTMLUListElement)
          ctx.dispatch({
            type : "SET_TIME",
            time : e.target.dataset.time
          })
        }}
      >
        {ctx.state.data.map((d, index) => {
          return (
            <li key={index} data-time={d.as_of} className={ctx.state.darkMode ? 'link-text' : ''}>
              {findDuration(d.as_of)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Time;
