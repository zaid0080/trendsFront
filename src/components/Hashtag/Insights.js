import { useState, useContext, useLayoutEffect } from "react";
import { useParams } from "react-router";
import { GlobalContext } from "../../global";
import "./hashtag.css";
import GeoChart from "./GeoChart";
import { changetoK } from "../Content/Tweet";

function parseTag(tag) {
  tag = window.decodeURIComponent(tag);
  return tag;
}

const Hashtag = (trendDetail) => {
  let params = useParams();
  let tag = parseTag(params.hashtag);
  const { city, country, darkMode } = useContext(GlobalContext);
  const selectedPlace = city === undefined ? country : city;
  const [place, setPlace] = useState(selectedPlace);

  useLayoutEffect(() => {
    setPlace(place);
  }, [place]);
  console.log(trendDetail)
  const countryHandler = (e) => {
    setPlace(e.target.value);
  };
  const filterCity = trendDetail.trendingLocations.filter(
    (d) => d.name === place
  );
  return (
    <div className={`hashtag-box ${darkMode ? "dark-hash" : ""}`}>
      <div>
        <h2 className="hash-line">
          Trending at
          <span className="hash-index">#{filterCity[0]?.trend?.index}</span>
          in
          <select className="country-drop" onChange={countryHandler}>
            {trendDetail.trendingLocations.map((t) => {
              return (
                <option selected={place === t.name} key={t.name}>
                  {t.name}
                </option>
              );
            })}{" "}
          </select>
        </h2>
        <div>
          <a
            className="hashtag-name"
            href={`https://twitter.com/search?q=${window.encodeURIComponent(
              tag
            )}&src=typed_query`}
            target="_blank"
            rel="noreferrer"
          >
            {tag}
          </a>
        </div>
        <div className="details">
          <div>
            <span className="details-1">
              {filterCity[0]?.trend?.tweet_volume === 0
                ? "N.A"
                : changetoK(filterCity[0]?.trend?.tweet_volume)}
            </span>
            No. of Tweets
          </div>
          <div>
            <span className="details-1">#{filterCity[0]?.trend?.index}</span>
            Highest Rank
          </div>
        </div>
        <div className="tweet-location">
          <p>
            Tweeted in
            <span>{trendDetail.trendingLocations.length}</span>
            other locations.
          </p>
        </div>
        <div>
          {" "}
          <GeoChart mapData={trendDetail.trendingLocations} />{" "}
        </div>
      </div>
    </div>
  );
};
export default Hashtag;
