import React, {useContext} from "react";
import { WorldMap } from "react-svg-worldmap";
import { getCode } from "country-list";
import { GlobalContext } from "../../global";

function GeoChart(mapData) {
  const {state} = useContext(GlobalContext)
  if (mapData) {
    const countryCode = mapData.mapData.filter(
      (d) => getCode(d.name) !== undefined
    );
    var toShow = countryCode.map((d) => {
      const country = getCode(d.name);
      const value = d.trend.tweet_volume + 1;
      return { country, value };
    });
  }

  const toolTipFuntion = (countryName, isoCode, value) => {
    let ret;
    if(Number(value) === 1) {
      ret= countryName.toString();
    } else {
      ret = countryName +' : ' + value;
    }
    return ret;
  }

  const stylingFunction = (context ) => {
    const opacityLevel = 0.5 + (1.5 * (context.countryValue - context.minValue) / (2*context.maxValue - context.minValue))
    const toret = {
        // fill: context.country === "US" ? "blue" : context.color, 
        fill: state.darkMode ? 'yellow' : '#017acd',
        fillOpacity: opacityLevel, 
        stroke: 'black', 
        strokeWidth: 0,
        strokeOpacity: 1.5, 
    }
    if(context.countryValue === 1){
      toret.fill = "#c0c0c0";
      return toret;
    }
    return toret;
}
  return (
    <div className="App">
      <WorldMap
        color="red"
        size="md"
        data={toShow}
        backgroundColor={state.darkMode ? '#172037' : '#fff'}
        borderColor= {state.darkMode ? '#fff' : '#000'}
        tooltipBgColor="#017acd"
        styleFunction={stylingFunction}
        tooltipTextFunction={toolTipFuntion}
      />
    </div>
  );
}

export default GeoChart;
