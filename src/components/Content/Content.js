import React from "react";
import Time from "./Time.js";
import Graph from "./Graph.js";
import TopTrends from "./TopTrends.js";

function Content() {
  return (
    <div id="content">
      <Time />
      <Graph />
      <TopTrends />
    </div>
  );
}

export default Content;
