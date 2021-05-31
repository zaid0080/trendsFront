import { useEffect, useState, useContext, useLayoutEffect } from "react";
import Helmet from "react-helmet";
import { useParams } from "react-router";
import { GlobalContext } from "../../global";
import "./hashtag.css";
import { HashLoader } from "react-spinners";
import Trending from "./Trending";
import GeoChart from "./GeoChart";
import Page404 from "../404Page/Page404.js";
import { changetoK } from "../Content/Tweet";

function parseTag(tag) {
  tag = window.decodeURIComponent(tag);
  console.log(tag);
  return tag;
}

const fetchTrendData = async (tag, setTrendDetail, setFetchError) => {
  try {
    const response = await fetch(
      "https://trendsend.herokuapp.com/apis/trends/trend-details",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ trend: tag }),
      }
    );
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      setTrendDetail(data.data);
      setFetchError(null);
    } else {
      console.log(response);
      throw response;
    }
  } catch (error) {
    console.log(error);
    setFetchError(error);
  }
};

const Hashtag = () => {
  let params = useParams();
  let tag = parseTag(params.hashtag);
  const { city, country } = useContext(GlobalContext);
  const selectedPlace = city === undefined ? country : city;
  const [fetchError, setFetchError] = useState(null);
  const [place, setPlace] = useState(selectedPlace);

  const [trendDetail, setTrendDetail] = useState({ trendingLocations: [] });

  useLayoutEffect(() => {
    setPlace(place);
  }, [place]);

  const countryHandler = (e) => {
    setPlace(e.target.value);
  };
  const filterCity = trendDetail.trendingLocations.filter(
    (d) => d.name === place
  );

  useEffect(() => {
    fetchTrendData(tag, setTrendDetail, setFetchError);
  }, [tag, place]);

  console.log(fetchError);

  if (fetchError === null) {
    if (trendDetail.trendingLocations.length >= 1) {
      return (
        <div className="hashtag">
          <Helmet>
              <meta
                name="description"
                content={`Find details abput Top trending hashtags in ${country} ${city}.`}
              />
              <meta
                name="title"
                content={`Tweet Name is ${tag}`}
              />

              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://alldaytrends.com/" />
              <meta
                property="og:title"
                content={`This tweet is trending is these locations ${trendDetail.trendingLocations.map(t => t.name)}`}
              />
              <meta
                property="og:description"
                content={`Total Number of tweets are ${filterCity[0]?.trend?.tweet_volume}`}
              />
              <meta property="og:image" content="%PUBLIC_URL%/logo.png" />

              <meta property="twitter:card" content="summary_large_image" />
              <meta
                property="twitter:url"
                content="https://alldaytrends.com/"
              />
              <meta
                property="twitter:title"
                content={`This tweets is trending in ${trendDetail.trendingLocations.length} locations`}
              />
              <meta
                property="twitter:description"
                content={`This tweets has the highest rank of ${filterCity[0]?.trend?.index}`}
              />
              <meta property="twitter:image" content="%PUBLIC_URL%/logo.png" />
            <title>{tag}</title>
          </Helmet>
          <div className="hashtag-box">
            <div>
              <h2 className="hash-line">
                Trending at
                <span className="hash-index">
                  #{filterCity[0]?.trend?.index}
                </span>
                in
                <select className="country-drop" onChange={countryHandler}>
                  {trendDetail.trendingLocations.map((t) => {
                    if (t.trend.name === place) {
                      return (
                        <option selected={true} key={t.name}>
                          {t.name}
                        </option>
                      );
                    }
                    return (
                      <option
                        className="select-items"
                        value={t.name}
                        key={t.name}
                      >
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
                  <span className="details-1">
                    #{filterCity[0]?.trend?.index}
                  </span>
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
                {/* <MapChart data={trendDetail.trendingLocations}  /> */}
                <GeoChart mapData={trendDetail.trendingLocations} />{" "}
                {/* <ReactTooltip>{mapContent}</ReactTooltip> */}{" "}
              </div>
            </div>
          </div>
          <div className="top-tweets-box">
            <Trending />
          </div>
        </div>
      );
    } else {
      return (
        <div className="hashtag">
          <Helmet>
            <title>Please Wait</title>
          </Helmet>
          <div className="hash-loader">
            <HashLoader color="#017acd" />
          </div>
        </div>
      );
    }
  } else {
    return <Page404 />;
  }
};
export default Hashtag;
