import React, { useContext } from "react";
import { GlobalContext } from "../../global";
import { VscLoading } from "react-icons/vsc";

function TopTrends() {
  const [, , , , , , selectedData, ,] = useContext(GlobalContext);
  console.log(selectedData);
  if (selectedData) {
    return (
      <div id="Trends-container">
        <h2 className="heading">Top Trends</h2>
        <ol className="ol-list">
          {[selectedData].map((trend) =>
            trend.trends.map((t) => {
              return <li key={t.index}>{t.name}</li>;
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
