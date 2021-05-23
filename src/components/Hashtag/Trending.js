import React, { useContext, useState } from "react";
import { GlobalContext } from "../../global";
import { fetchAndSetData } from "../Content/Content";
import { Link } from "react-router-dom";

function Trending() {
  const { city, country, setData, setTime } = useContext(GlobalContext);
  const [placeError, setPlaceError] = useState(null);
  
  let sessionData = window.sessionStorage.getItem("data");
  if (sessionData === null) {
    const query = city === undefined ? country : city;
    fetchAndSetData(query, setData, setTime,setPlaceError);
    sessionData = window.sessionStorage.getItem("data");
  }
  const d = JSON.parse(sessionData);
  // console.log(d[0]);
  if (d) {
    return (
      <>
        <p className="tt-tag">Trending Now</p>
        <ul className="tt-trends">
          {d[0].trends
            .filter((d, i) => i < 10)
            .map((d) => (
              <li key={d.index}>
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
