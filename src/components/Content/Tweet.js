import React, { useState, useContext, useRef } from "react";
import { GlobalContext } from "../../global";
import { findDuration } from "./Time";
import { Link } from "react-router-dom";
import "./tweet.css";
//import { useParams } from "react-router-dom";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { IoMdArrowDropdownCircle } from 'react-icons/io';

function changetoK(x) {
  if (x > 1000) {
    return Math.floor(x / 1000) + "k";
  }
  return x;
}

function Tweet() {
  const [, , data] = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollLeft += 400;
  };
  const scrollRight = () => {
    scrollRef.current.scrollLeft -= 400;
  };

  // let { country } = useParams();
  // console.log(country);

  if (data) {
    return (
      <>
        <div className="scroll-buttons">
          <FaArrowCircleLeft onClick={scrollRight} className="left-button" />
          <h3>Country Name</h3>
          <FaArrowCircleRight onClick={scrollLeft} className="right-button" />
        </div>

        <div className="trends-cont" ref={scrollRef}>
          {data.map((d, index) => {
            return (
              <>
                <div className="card">
                  <h4 data-time={d._id}>{findDuration(d._id)}</h4>
                  <ol className="tweets">
                    {d.trends.map((t) => {
                      if (t.tweet_volume > 0) {
                        return (
                          <Link
                            to={`/trend/${t.name.replace(/#/g, "_")}`}
                            className={`tweet-names tweet-names-${t.index} ${open ? `open` : `close-${t.index}`}`}
                            key={t.index}
                          >
                            {" "}
                            {t.name}{" "}
                            <span className="tweet-volume">
                              {changetoK(t.tweet_volume)}
                            </span>{" "}
                          </Link>
                        );
                      }
                      return (
                        <Link
                          to={`/trend/${t.name.replace(/#/g, "_")}`}
                          className={`tweet-names tweet-names-${t.index} ${open ?  `open` : `close-${t.index}`}`}
                          key={t.index}
                        >
                          {" "}
                          {t.name}{" "}
                        </Link>
                      );
                    })}
                  </ol>
                  <div className='tweet-btn'>
                  {/* <button className='btn' onClick={() => setOpen(!open)}>{open ? "Hide" : "Show More"}</button> */}
                 <IoMdArrowDropdownCircle  onClick={() => setOpen(!open)}/>
                  </div>
                </div>
               
              </>
            );
          })}
        </div>
      </>
    );
  }
}

export default Tweet;
