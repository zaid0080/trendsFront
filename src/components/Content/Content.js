import { useEffect, useContext } from "react";
import Time from "./Time.js";
import TopTrends from "./TopTrends.js";
import { GlobalContext } from "../../global";
import { useParams } from 'react-router-dom';
import Tweet from "./Tweet.js";

const fetchAndSetData = async (woeid, setData, setTime) => {
  try{
    const res = await fetch(`https://trendsend.herokuapp.com/trends/by-place?placeName=${woeid}`);
    const data = await res.json();
    console.log(data);
    if(data){
      setData(data.data);
      setTime(data.data[0]._id);
    }
  }catch(error){
    console.error(error);
  }
};


function Content() {
  const {setCity, setCountry ,setData, setSelectedTime} = useContext(GlobalContext);

  const { country, city } = useParams();

  useEffect(() => {
    setCity(city );
    setCountry(country);
    const query = city === undefined ? country : city;
    console.log(query,city,country);
    fetchAndSetData(query, setData, setSelectedTime);
  }, [setData, setSelectedTime, setCountry, setCity, country, city]);

  return (
    <div id="content">
      <Time />
      <TopTrends />
      <Tweet />
    </div>
  );
}

export default Content;
