import React from "react";
import { VectorMap } from "react-jvectormap";


const { getCode } = require("country-list"); 


const CodeMap = (data, {setTooltipContent}) => {
  if(data){
    const countryCode = data.data.filter((d) => getCode(d.place) !== undefined);
    var toShow = {};
    countryCode.forEach(d => {
      const cCode = getCode(d.place);
      toShow[cCode] = d.volume;
    })
  }
  return (
    <div className='map-chart'>
      <VectorMap
        map={"world_mill"}
        backgroundColor="transparent" //change it to ocean blue: #0077be
        zoomOnScroll={false}
        containerStyle={{
          width: "100%",
          height: "600px"
        }}
        containerClassName="map"
        regionStyle={{
          initial: {
            fill: "#e4e4e4",
            "fill-opacity": 0.9,
            stroke: "none",
            "stroke-width": 0,
            "stroke-opacity": 0
          },
          hover: {
            "fill-opacity": 0.8,
            cursor: "pointer",
          },
          selected: {
            fill: "#000" //color for the clicked country
          },  
        }}
        regionsSelectable={false}
        
        series={{
          regions: [
            {
              values: toShow, //this is your data
              scale: ["#146804", "#ff0000"], //your color game's here
              normalizeFunction: "polynomial"
            }
          ]
        }}
      />
    </div>
  );
};
export default CodeMap;