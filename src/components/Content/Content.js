import React, { useEffect, useContext } from "react";
import Time from "./Time.js";
//import Graph from "./Graph.js";
import TopTrends from "./TopTrends.js";
import { GlobalContext } from "../../global";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Tweet from "./Tweet.js";



const fetchAndSetData = async (woeid, setData, setTime) => {
  try{
    const res = await axios.get(`http://trendsend.herokuapp.com/trends/by-place?placeName=${woeid}`);
    const data = await res.data;
    if(data){
      window.data = data.data;
      setData(data.data);
      setTime(data.data[0]._id);
    }
  }catch(error){
    console.error(error);
  }
};



function Content() {
  const [woeid, setWoeid , , setData, , setSelectedTime] = useContext(GlobalContext);

  const { country, city } = useParams();
  console.log(city)
  console.log(country)

  useEffect(() => {
    if(city === '') {
      setWoeid(country);
    }
    else {
      setWoeid(city);
    }
    fetchAndSetData(woeid, setData, setSelectedTime);
  }, [woeid, setData, setSelectedTime, setWoeid, country, city]);

  return (
    <div id="content">
      <Time />
      <TopTrends />
      <Tweet />
      {/* <Graph  /> */}
    </div>
  );
}

export default Content;
