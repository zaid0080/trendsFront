import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../global";
import { HashLoader } from 'react-spinners';

function TopTrends() {
  const { data, selectedTime, selectedData, setSelectedData } = useContext(GlobalContext);
  
  useEffect(() => {
    setSelectedData(undefined);
    const x = data.find((d) => d._id === selectedTime);
    setSelectedData(x);
  },[data, selectedTime, setSelectedData])
  
  console.log(selectedData);

  if (selectedData) {
    return (
      <div id="Trends-container">
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
      <div className='hash-loader-mobile'>
                <HashLoader color='#00a2f5' size={35} />
        </div>
    );
  }
}

export default TopTrends;
