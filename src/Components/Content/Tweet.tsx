import React, { useState, useContext, useRef, useEffect } from "react";
import { GlobalContext } from "../../global";
import { findDuration } from "./Time";
import { Link, useParams } from "react-router-dom";
import "./tweet.css";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
import { Helmet } from "react-helmet";

export function changetoK(x) {
  if (x > 1e6) {
    return Math.floor(x / 1e6) + "M";
  } else if (x > 1e3) {
    return Math.floor(x / 1e3) + "K";
  }
  return x;
}


type IRouterParams = {
  country: string
  city: string
}

export function Tweet() {
  const { state, dispatch } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);

  const params = useParams<IRouterParams>();
  const country = params.country?.replace(/_/g, " ");
  const city = params.city?.replace(/_/g, " ");

  useEffect(() => {
    dispatch({
      type: "SET_DATA",
      data : []
    })
  }, [country]);

  const scrollLeft = () => {
    scrollRef.current.scrollLeft += 400;
  };
  const scrollRight = () => {
    scrollRef.current.scrollLeft -= 400;
  };

  if (state.data.length) {
    return (
      <>
        <Helmet>
          <title>
            Twitter Trends{" "}
            {city === undefined ? country : city + ", " + country} 🕊️ Top
            Trending Hashtags 🕊️ Today{" "}
          </title>
          <meta
            name="description"
            content={`Latest top twitter trends and hashtags in ${
              city === undefined ? country : city + ", " + country
            }. 
            Currently twitter trends and hashtags today are ${state.data[0].trends.slice(0,6).map(d => d.name)}`} // ANCHOR state.data
          />
          <meta
            name="title"
            content={`Top Twitter trends in ${country} ${
              city || ""
            }are  ${state.data[0].trends.slice(0,6).map(d => d.name)}`} // ANCHOR state.data
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://alldaytrends.com/" />
          <meta
            property="og:title"
            content={`Top Twitter trends in ${country} ${city || ""}are ${state.data[0].trends      // ANCHOR state.data
              .map((d) => d.name)
              .toString()
              .replace(",", "")}`}
          />
          <meta
            property="og:description"
            content={`Latest top twitter trends and hashtags in ${
              city === undefined ? country : city + ", " + country
            }. 
            Currently twitter trends and hashtags today are ${state.data[0].trends.slice(0,6).map(d => d.name)}`} // ANCHOR state.data
          />
          <meta property="og:image" content="%PUBLIC_URL%/logo.png" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@alldaytrends1" />
          <meta property="twitter:url" content="https://alldaytrends.com/" />
          <meta
            property="twitter:title"
            content={`Top Twitter trends in ${country} ${city || ""}are ${state.data[0].trends.slice(0, 10) // ANCHOR state.data
              .map((d) => d.name)
              .toString()
              .replace(",", "")}`}
          />
          <meta
            property="twitter:description"
            content={`Find more details about Top Twitter  trending hashtags in ${country} ${city}. 
            Find more information on ${state.data[0].trends.slice(0,10)   // ANCHOR state.data
              .map((d) => d.name)
              .toString()
              .replace(",", "")}`}
          />
          <meta property="twitter:image" content="%PUBLIC_URL%/logo.png" />
        </Helmet>
        <div className="scroll-buttons">
          <FaArrowCircleLeft onClick={scrollRight} className="left-button" />
          <FaArrowCircleRight onClick={scrollLeft} className="right-button" />
        </div>
        <div className={`trends-cont ${state.darkMode ? 'dark-cont' : ''}`} ref={scrollRef}>  // ANCHOR state.data
          {state.data.map((d, index) => {       // ANCHOR state.data
            return (
              <div
                className={`card ${state.darkMode ? "dark-card" : "light-card"}`}     // ANCHOR state.data
                key={d.as_of}
              >
                <h4 data-time={d.as_of}>{findDuration(d.as_of)}</h4>
                <ol className="tweets">
                  {d.trends.map((t) => {
                    if (t.tweet_volume > 0) {
                      return (
                        <Link
                          to={`/${country}${
                            city === undefined ? "" : "/" + city
                          }/trend/${window.encodeURIComponent(t.name)}`}
                          className={`tweet-names ${state.darkMode ? "dark-tweet" : "light-tweet"} tweet-names-${t.index} ${      // ANCHOR state.data
                            open
                              ? `open`
                              : `close-${t.index}`
                          }`}
                          key={t.index}
                        >
                          {" "}
                          {t.name}{" "}
                          <span className="tweet-volume">
                            {changetoK(t.tweet_volume)} tweets
                          </span>{" "}
                        </Link>
                      );
                    }
                    return (
                      <Link
                        to={`/${country}${
                          city === undefined ? "" : "/" + city
                        }/trend/${window.encodeURIComponent(t.name)}`}
                        className={`tweet-names ${state.darkMode ? "dark-tweet" : "light-tweet"} tweet-names-${t.index} ${        // ANCHOR state.data
                          open
                            ? `open`
                            : `close-${t.index}`
                        }`}
                        key={t.index}
                      >
                        {" "}
                        {t.name}{" "}
                      </Link>
                    );
                  })}
                </ol>
                <div className="tweet-btn">
                  {open ? (
                    <IoMdArrowDropupCircle onClick={() => setOpen(!open)} />
                  ) : (
                    <IoMdArrowDropdownCircle onClick={() => setOpen(!open)} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
  return null;
}
