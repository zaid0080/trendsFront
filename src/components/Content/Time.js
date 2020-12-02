import React from "react";

function Time() {
  const times = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
  ];
  return (
    <div id="time-container">
      <ul className="list-item">
        <li>Now</li>
        {times.map((time, index) => {
          return <li key={index}>{time}h ago</li>;
        })}
      </ul>
    </div>
  );
}

export default Time;
