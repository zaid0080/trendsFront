import React, { useEffect,useContext } from "react";
import Time from "./Time.js";
import Graph from "./Graph.js";
import TopTrends from "./TopTrends.js";
import {GlobalContext} from '../../global';
import axios from "axios";


const fetchAndSetData = async (woeid, setData,setTime) =>{
  const res = await axios.get(`https://trendsend.herokuapp.com/t/${woeid}`);
  const data = await res.data
  setData(data);
  setTime(data[0].as_of)
}

function Content() {

  const [woeid,,,setData,,setSelectedTime] = useContext(GlobalContext);


  useEffect(()=>{
    fetchAndSetData(woeid,setData,setSelectedTime)
  },[woeid,setData])

  
  return (
    <div id="content">
      <Time />
      <Graph />
      <TopTrends />
    </div>
  );
}

export default Content;
