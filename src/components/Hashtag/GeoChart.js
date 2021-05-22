import React from "react";
import { WorldMap } from "react-svg-worldmap";
import { getCode } from "country-list";

function GeoChart(mapData) {
  if (mapData) {
    const countryCode = mapData.mapData.filter(
      (d) => getCode(d.name) !== undefined
    );
    var toShow = countryCode.map((d) => {
      const country = getCode(d.name);
      const value = d.trend.tweet_volume;
      return { country, value };
    });
  }

  const stylingFunction = (context ) => {
    const opacityLevel = 0.5 + (1.5 * (context.countryValue - context.minValue) / (context.maxValue - context.minValue))
    return {
        // fill: context.country === "US" ? "blue" : context.color, 
        fill: '#017acd',
        fillOpacity: opacityLevel, 
        stroke: "black", 
        strokeWidth: 1, 
        strokeOpacity: 1.5, 
           }
}
  return (
    <div className="App">
      <WorldMap
        color="red"
        size="lg"
        data={toShow}
        tooltipBgColor="#017acd"
        styleFunction={stylingFunction}
      />
    </div>
  );
}

export default GeoChart;
