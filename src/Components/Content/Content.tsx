import { useEffect, useContext,useState } from "react";
import Time from "./Time";
import TopTrends from "./TopTrends"
import { GlobalContext } from "../../global";
import { useParams } from 'react-router-dom';
import { Tweet } from "./Tweet"; 
import Header from '../Header/Header';
import Page404 from "../404Page/Page404";

type RouterParams = {
  country: string
  city: string
}


export const fetchAndSetData = async (place, setData, setTime, setError) => {
  try{
    const res = await fetch(`https://trendsend.herokuapp.com/apis/trends/by-place?placeName=${place}`);
    if(res.ok){
      const jsonData = await res.json();
      if(jsonData.data){
        setData(jsonData.data );
        window.sessionStorage.setItem('data',JSON.stringify(jsonData.data))
        setTime(jsonData.data[0].as_of);
        setError(null)
      }
    } else {
      throw res;
    }
  }catch(error){
    console.log(error);
    setError(error);
  }
};

export function Content() {
  const ctx = useContext(GlobalContext);

  const params = useParams<RouterParams>();

  let country = params.country?.replace(/_/g,' ')
  let city = params.city?.replace(/_/g,' ')
  const [error,setError] = useState(null);

  useEffect(() => {
    ctx.dispatch({
      type: "SET_PLACE",
      place : `${country},${city}`
    })
    sessionStorage.setItem("country", country);
    const query = city === undefined ? country : city;
  }, []);

  if(error === null){
    return (
      <div id="content">
        <Header />
        <Time />
        <TopTrends />
        <Tweet />
      </div>
    );
  } 
  return <Page404 />
}
