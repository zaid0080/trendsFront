import { useEffect, useState, useContext, useLayoutEffect } from "react";
import Helmet from "react-helmet";
import { useParams } from "react-router";
import { GlobalContext } from "../../global";
import "./hashtag.css";
import { HashLoader } from "react-spinners";
import Trending from "../../components/Hashtag/Trending";
import Insights from '../../components/Hashtag/Insights'
import Page404 from "../../components/404Page/Page404";

function parseTag(tag) {
  tag = window.decodeURIComponent(tag);
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
  const { city, country,darkMode } = useContext(GlobalContext);
  const selectedPlace = city === undefined ? country : city;
  const [fetchError, setFetchError] = useState(null);
  const [place, setPlace] = useState(selectedPlace);

  const [trendDetail, setTrendDetail] = useState({ trendingLocations: [] });

  useLayoutEffect(() => {
    setPlace(place);
  }, [place]);

  useEffect(() => {
    fetchTrendData(tag, setTrendDetail, setFetchError);
  }, [tag, place]);

  if (fetchError === null) {
    if (trendDetail.trendingLocations.length >= 1) {
      return (
        <div className={`hashtag ${darkMode ? 'dark' : 'light-hash'}`}>
          <Helmet>
              <meta
                name="description"
                content={`Find details about Current Top Twitter trending hashtags and Topics on Twitter in ${country} ${city}.`}
              />
              <meta
                name="title"
                content={`Current Twitter Trend and Hashtag Name is ${tag}`}
              />
             <meta name="twitter:site" content="@alldaytrends1" />
              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://alldaytrends.com/" />
              <meta property="og:site_name" content="alldaytrends" />
              <meta
                property="og:title"
                content={`Current Twitter Hashtag Name is ${tag}`}
              />
              <meta
                property="og:description"
                content={`Find details about Top trending hashtags on Twitter in ${country} ${city}.`}
              />
              <meta property="og:image" content="%PUBLIC_URL%/logo.png" />

              <meta property="twitter:card" content="summary_large_image" />
              <meta
                property="twitter:url"
                content="https://alldaytrends.com/"
              />
              <meta
                property="twitter:title"
                content={`Twitter trends ${trendDetail.trendingLocations.length} locations`}
              />
              <meta
                property="twitter:description"
                content={`Twitter trends ${trendDetail.trendingLocations.map(t => t.name)}`}
              />
              <meta property="twitter:image" content="%PUBLIC_URL%/logo.png" />
            <title>{tag} 🕊️ {city === undefined ? country : city + ', ' + country} 🕊️ Twitter Trends</title>
          </Helmet>
          <Insights trends = {{...trendDetail}}/>
          <div className={`top-tweets-box ${darkMode ? 'dark-nav' : 'light-hash'}`}>
            <Trending />
          </div>
        </div>
      );
    } else {
      return (
        <div className={`hashtag ${darkMode ? 'dark' : 'light-hash'}`}>
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
