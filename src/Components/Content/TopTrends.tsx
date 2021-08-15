import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../global";
import { HashLoader } from "react-spinners";
import { Link, useParams } from "react-router-dom";

function changetoK(x) {
  if (x > 1000) {
    return Math.floor(x / 1000) + "k";
  }
  return x;
} 

type IRouterParams = {
  country: string,
  city: string
}

function TopTrends() {

  const { state, dispatch } = useContext(GlobalContext);

  const { country, city } = useParams<IRouterParams>();

  useEffect(() => {
    const x = state.data.find((d) => d.as_of === state.selectedTime);
    dispatch({
      type: "SET_SELECTED_DATA",
      data : x
    })
  },[state.selectedTime])
  
  if (state.selectedData) {
    return (
      <div id="Trends-container">
        <ol className={`ol-list`}>
          {[state.selectedData].map((trend:any) =>                      // ANCHOR Remove this any 
            trend.trends.map((t) => {
              if (t.tweet_volume > 0) {
                return (
                  <li key={t.index} >
                  <Link
                    to={`/${country}${ city === undefined ? "" : "/" + city
                    }/trend/${window.encodeURIComponent(t.name)}`}
                    key={t.index}
                    className={`${state.darkMode ? 'dark-nav link-text' : ''}`}
                  >
                    {t.name} <span className={state.darkMode ? 'dark-text' : 'light-text'}>{changetoK(t.tweet_volume)}</span>
                  </Link>
                  </li>
                );
              }
              return (
                <li key={t.index} >
                <Link
                  to={`/${country}${
                    city === undefined ? "" : "/" + city
                  }/trend/${window.encodeURIComponent(t.name)}`}
                  key={t.index}
                  className={`${state.darkMode ? 'dark-nav link-text' : ''}`}
                >
                  {t.name} 
                </Link>
                </li>
                
              );
            })
          )}
        
        </ol>
      </div>
    );
  } else {
    return (
      <div className="hash-loader-mobile">
        <HashLoader color="#00a2f5" size={35} />
      </div>
    );
  }
}

export default TopTrends;
