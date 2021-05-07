import React, { useEffect, useContext } from "react";
import { VscLoading } from "react-icons/vsc";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  LabelList,
  ResponsiveContainer,
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
    const x = data.data.find((d) => d._id === selectedTime);
    setSelectedData(x);
  }, [data, selectedTime, setSelectedData]);

  if (selectedData) {
    return (
      <div id="graph-container">
        <ResponsiveContainer width="95%" height="99%">
          <BarChart
            data={selectedData.trends}
            margin={{
              top: 30,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            className="barchart"
          >
            <XAxis
              dataKey="name"
              padding={{ left: 20, right: 20 }}
              hide={true}
            />
            <YAxis hide={true} />
            <Tooltip />
            <Label dataKey={selectedTime} />
            <Bar
              dataKey="tweet_volume"
              fill="#2f3640"
              background={{ fill: "#03fcc2" }}
              minPointSize={20}
            />
            <LabelList dataKey="name" position="Top" angle="90" />
          </BarChart>
        </ResponsiveContainer>
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
