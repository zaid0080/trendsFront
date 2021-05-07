import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../global";
import { VscLoading } from "react-icons/vsc";

function TopTrends() {
  const [, , data, , selectedTime, , selectedData, setSelectedData,] = useContext(GlobalContext);
  
  useEffect(() => {
    const x = data.find((d) => d._id === selectedTime);
    setSelectedData(x);
  },[data, selectedTime, setSelectedData])
  
  if (selectedData) {
    return (
      <div id="Trends-container">
        {/* <h2 className="heading">Top Trends</h2> */}
        <ol className="ol-list">
          {[selectedData].map((trend) =>
            trend.trends.map((t) => {
              return <li key={t.index}>{t.name} <span>{t.tweet_volume}</span></li>;
            })
          )}
        </ol>
      </div>
    );
  } else {
    return (
      <div className="loadings">
        <VscLoading className="loading-icon" />
      </div>
    );
  }
}

export default TopTrends;
