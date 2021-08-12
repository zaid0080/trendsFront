import { useEffect, useState, useContext, useLayoutEffect } from "react";
import { useParams } from "react-router";
import { GlobalContext } from "../../global";
import "./hashtag.css";
import { HashLoader } from "react-spinners";
import Trending from "../../components/Hashtag/Trending";
import Insights from '../../components/Hashtag/Insights'
import Page404 from "../../components/404Page/Page404";
import SEO from "../../components/SEO"

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
  let params  = useParams();
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
    if (trendDetail.trendingLocations.length > 0) {
      return (
        <div className={`hashtag ${darkMode ? 'dark' : 'light-hash'}`}>
          <SEO { ...{tag , country , city, trendDetail } }  />
          <Insights trendDetail = {trendDetail} />
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
