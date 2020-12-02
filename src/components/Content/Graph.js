import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";

function Graph() {
  const [data, setData] = useState([]);
  let date = Date.now();
  console.log(date);
  useEffect(() => {
    axios
      .get(`https://trendsend.herokuapp.com/trend/1?Ttime=1606751164127`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(data);
  return (
    <div id="graph-container">
      <BarChart
        width={650}
        height={350}
        data={data.trends}
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
}

export default Graph;
