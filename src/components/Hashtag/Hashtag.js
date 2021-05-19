//import { Content } from 'antd/lib/layout/layout';
import axios from 'axios';
import { useEffect, useState, useContext, useLayoutEffect } from 'react';
import Helmet from 'react-helmet';
import { useParams } from 'react-router';
import urlencode from 'urlencode';
import {GlobalContext} from '../../global'
import './hashtag.css';
import MapChart from './MapChart';
import {HashLoader} from 'react-spinners';



function parseTag(tag){
    tag = urlencode.decode(tag);
    if(tag[0] === '_'){
        return tag.replace('_','#');
    }
    return tag;
}



const fetchTrendData = async(tag,setTrendDetail) => {
    try {
        const response = await axios.post('https://trendsend.herokuapp.com/trends/trend-details',{
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
    const {woeid} = useContext(GlobalContext);
    const [city, setCity] = useState(woeid);
    
    const [trendDetail, setTrendDetail] = useState({trendingLocations: []});

    useLayoutEffect(() => {
        setCity(city)
    },[city])

    const countryHandler = (e) => {
        setCity(e.target.value);
    }
    const filterCity = trendDetail.trendingLocations.filter(d => d.name === city);

    useEffect(() =>{
        fetchTrendData(tag,setTrendDetail);
    },[tag, city]);

    if(trendDetail.trendingLocations.length > 1){
        return (
            <div className='hashtag'>
            <Helmet>
                <title>{tag}</title>
            </Helmet>
            <div className='hashtag-box'>
                <div>
                    <h2 className='hash-line'>Trending at <span className='hash-index'>#{filterCity[0].trend.index}</span> in 
                        <select className='country-drop' onChange={countryHandler}>
                            {trendDetail.trendingLocations.map(t => {
                                if(t.trend.name=== woeid){
                                    return (
                                        <option selected={true} key={t.name}>{t.name}</option>
                                    )
                                }
                                return (
                                        <option className='select-items' value={t.name} key={t.name}>{t.name}</option>
                                )
                            })}
                        </select>
                    </h2>
                    <div>
                    <h1 className='hashtag-name'>{tag}</h1>
                    </div>
                    <div className='details'>
                        <div><span className='details-1'>{filterCity[0].trend.tweet_volume}</span> No. of Tweets</div>
                        <div><span className='details-1'>#{filterCity[0].trend.index}</span> Highest Rank</div>
                    </div>
                    <div className='tweet-location'>
                        <p>Tweeted in <span>{trendDetail.trendingLocations.length}</span> other locations.</p>
                    </div>
                    <div>
                        <MapChart data={trendDetail.trendingLocations}  />
                        {/* <ReactTooltip>{mapContent}</ReactTooltip> */}
                    </div>
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
            <div className='hash-loader'>
                <HashLoader color='#00a2f5' />
            </div>
            </div>
        )
    }

}
export default Hashtag;