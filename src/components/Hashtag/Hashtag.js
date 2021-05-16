import axios from 'axios';
import { useEffect, useState, useContext, useLayoutEffect } from 'react';
import Helmet from 'react-helmet';
import { useParams } from 'react-router';
import urlencode from 'urlencode';
import {GlobalContext} from '../../global'
import './hashtag.css';


// const openNotification = (msg,desc) => {
//     notification.error({
//       message: msg,
//       description: desc,
//     });
//   };

function parseTag(tag){
    tag = urlencode.decode(tag);
    if(tag[0] === '_'){
        return tag.replace('_','#');
    }
    return tag;
}

const fetchTrendData = async(tag,setTrendDetail) => {
    try {
        const response = await axios.post('http://trendsend.herokuapp.com/trends/trend-details',{
            trend : tag
        })
        setTrendDetail(response.data.data);
    } catch (error) {
        if(error.isAxiosError){
            window.e = error;
            // openNotification(error.response.statusText,error.response.data.message);
        }
    }
}

const Hashtag = () => {
    let params = useParams();
    let tag = parseTag(params.hashtag);

    const [woeid] = useContext(GlobalContext);
    const [city, setCity] = useState(woeid);
    
    const [trendDetail, setTrendDetail] = useState({firstSeen : '', trendingLocations: []});

    useLayoutEffect(() => {
        setCity(city)
    },[city])

    const countryHandler = (e) => {
        setCity(e.target.value);
    }

    const filterCity = trendDetail.trendingLocations.filter(d => d.place === city);

    useEffect(() =>{
        fetchTrendData(tag,setTrendDetail);
    },[tag, city]);

    if(trendDetail.trendingLocations.length > 1){
        return (
            <div className='hashtag'>
            {/* <Helmet>
                <title>{tag}</title>
            </Helmet>
            <h1>TrendName : {tag}</h1>
            <p>Total trending in {trendDetail.trendingLocations.length} places</p>
            <div class ="treding">
                {trendDetail.trendingLocations.map(d => {
                    return(
                    <Card title={d.place} style={{ width: 300 }}>
                        <p>Index : {d.index}</p>
                        <p>Volume : {d.volume}</p>
                        <p>Last seen : {d.as_of}</p>
                    </Card>
                    )
                } )}
            </div> */}
            <div className='hashtag-box'>
                <div>
                    <h2>Trending at <span>#{filterCity[0].index}</span> in 
                        <select className='country-drop' onChange={countryHandler}>
                            {trendDetail.trendingLocations.map(t => {
                                // console.log(trendDetail.trendingLocations)
                                if(t.place=== woeid){
                                    console.log(t.index)
                                    return (
                                        <>
                                        <option selected={true} >{t.place}</option>
                                        </>
                                    )
                                }
                                // console.log(t.index)
                                return (
                                    <>
                                        <option value={t.place}>{t.place}</option>
                                    </>
                                )
                            })}
                        </select>
                        {tag}
                    </h2>
                </div>
            </div>
            <div className='top-tweets-box'>
            </div>
            </div>
        )
    } else {
        return (
            <div className='hashtag'>
            <Helmet>
                <title>Please Wait</title>
            </Helmet>
            </div>
        )
    }

}
export default Hashtag;