import React, { useState, useContext, useRef, useEffect } from "react";
import { GlobalContext } from "../../global";
import { findDuration } from "./Time";
import { Link, useParams } from "react-router-dom";
import "./tweet.css";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
// import { Helmet } from "react-helmet";
import SEO from '../SEO';

export function changetoK(x) {
  if (x > 1e6) {
    return Math.floor(x / 1e6) + "M";
  } else if (x > 1e3) {
    return Math.floor(x / 1e3) + "K";
  }
  return x;
}

export function Tweet() {
  const { data, setData, darkMode } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);

  const country = useParams().country?.replace(/_/g, " ");
  const city = useParams().city?.replace(/_/g, " ");

  useEffect(() => {
    setData([]);
  }, [country, setData]);

  const scrollLeft = () => {
    scrollRef.current.scrollLeft += 400;
  };
  const scrollRight = () => {
    scrollRef.current.scrollLeft -= 400;
  };

  if (data.length) {
    return (
      <>
        <SEO country={country} city={city} data={data} />
        <div className="scroll-buttons">
          <FaArrowCircleLeft onClick={scrollRight} className="left-button" />
          <FaArrowCircleRight onClick={scrollLeft} className="right-button" />
        </div>
        <div className={`trends-cont ${darkMode ? 'dark-cont' : ''}`} ref={scrollRef}>
          {data.map((d, index) => {
            return (
              <div
                className={`card ${darkMode ? "dark-card" : "light-card"}`}
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
                          className={`tweet-names ${darkMode ? "dark-tweet" : "light-tweet"} tweet-names-${t.index} ${
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
                        className={`tweet-names ${darkMode ? "dark-tweet" : "light-tweet"} tweet-names-${t.index} ${
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
