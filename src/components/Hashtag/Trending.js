import React, { useContext } from "react";
import { GlobalContext } from "../../global";
import { fetchAndSetData } from "../Content/Content";
import { Link } from "react-router-dom";

function Trending() {
  const { city, country, setData, setTime } = useContext(GlobalContext);
  let sessionData = window.sessionStorage.getItem("data");
  if (sessionData === null) {
    const query = city === undefined ? country : city;
    fetchAndSetData(query, setData, setTime);
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
              <li key={d.index} className={`tweet-names-${d.index}`}>
                <Link
                  to={`/${country}${
                    city === undefined ? "" : "/" + city
                  }/trend/${d.name.replace(/#/g, "_")}`}
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
