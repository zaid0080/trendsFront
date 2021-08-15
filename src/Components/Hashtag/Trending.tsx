import React, { useContext, useState } from "react";
import { GlobalContext } from "../../global";
import { fetchAndSetData } from "../Content/Content";
import { Link } from "react-router-dom";

function Trending() {
  const { state, dispatch } = useContext(GlobalContext);
  
  const setPlaceError = useState(null)[1];
  
  let sessionData = window.sessionStorage.getItem("data");

  const [country,city] = state.place.split(',');

  if (sessionData === null) {
    const query = state.place.split(',').pop()
    dispatch({
      type: "FETCH_DATA",
      place: query
    })
    // fetchAndSetData(query, setData, setTime,setPlaceError);
    sessionData = window.sessionStorage.getItem("data");
  }
  const d = JSON.parse(sessionData);
  if (d) {
    return (
      <>
        <p className="tt-tag">Trending Now</p>
        <ul className="tt-trends">
          {d[0].trends
            .filter((d, i) => i < 10)
            .map((d) => (
              <li key={d.index} className={state.darkMode ? 'dark-hash' : 'light-list'}>
                <Link
                  to={`/${country}${
                    city === undefined ? "" : "/" + city
                  }/trend/${window.encodeURIComponent(d.name)}`}
                >
                  {d.name}
                </Link>
              </li>
            ))}
        </ul>
      </>
    );
  } else {
    return null;
  }
}

export default Trending;
