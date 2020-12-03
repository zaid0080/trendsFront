import React, { useEffect, useContext } from "react";
import { VscLoading } from "react-icons/vsc";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";
import { GlobalContext } from "../../global";

function Graph() {
  const [
    ,
    ,
    data,
    ,
    selectedTime,
    ,
    selectedData,
    setSelectedData,
  ] = useContext(GlobalContext);

  useEffect(() => {
    const x = data.find((d) => d.as_of === selectedTime);
    setSelectedData(x);
  }, [data, selectedTime, setSelectedData]);

  if (selectedData) {
    return (
      <div id="graph-container">
        <BarChart
          width={650}
          height={350}
          data={selectedData.trends}
          margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          className="barchart"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="tweet_volume"
            fill="#2f3640"
            background={{ fill: "#03fcc2" }}
          />
          <LabelList dataKey="name" position="Top" angle="90" />
        </BarChart>
      </div>
    );
  } else {
    return (
      <div className="loading">
        <VscLoading className="loading-icon" />
      </div>
    );
  }
}

export default Graph;
