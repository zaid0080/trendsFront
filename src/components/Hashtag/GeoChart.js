import React from "react"
import { WorldMap } from "react-svg-worldmap";
import { getCode } from "country-list";

function GeoChart(mapData) {
    console.log(mapData)
    if(mapData) {
    const countryCode = mapData.mapData.filter((d) => getCode(d.name) !== undefined);
    var toShow = countryCode.map(d => {
        const country = getCode(d.name);
        const value =  d.trend.tweet_volume;
        return {country,value};
    })
    console.log(toShow);
}

  return (
    <div className="App" >
       <WorldMap color="red"  value-suffix="people" size="lg" data={toShow} />
    </div>
  )
}

export default GeoChart;