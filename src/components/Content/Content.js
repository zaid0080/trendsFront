import { useEffect, useContext } from "react";
import Time from "./Time.js";
import TopTrends from "./TopTrends.js";
import { GlobalContext } from "../../global";
import { useParams } from 'react-router-dom';
import Tweet from "./Tweet.js";


export const fetchAndSetData = async (place, setData, setTime) => {
  try{
    const res = await fetch(`https://trendsend.herokuapp.com/trends/by-place?placeName=${place}`);
    const jsonData = await res.json();
    if(jsonData){
      setData(jsonData.data);
      window.sessionStorage.setItem('data',JSON.stringify(jsonData.data))
      setTime(jsonData.data[0]._id);
    }
  }catch(error){
    setData([]);
    window.sessionStorage.setItem('data',JSON.stringify([]));
    alert("Place doesnt exist");
    console.error(error);
  }
};

export function Content() {
  const {setCity, setCountry ,setData, setSelectedTime} = useContext(GlobalContext);

  const { country, city } = useParams();

  useEffect(() => {
    setCity(city );
    setCountry(country);
    const query = city === undefined ? country : city;
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
