import axios from 'axios';
import { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { useParams } from 'react-router';
import urlencode from 'urlencode';
import {  Button, notification,Card  } from 'antd';
import './hashtag.css';


const openNotification = (msg,desc) => {
    notification.error({
      message: msg,
      description: desc,
    });
  };

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
            openNotification(error.response.statusText,error.response.data.message);
        }
    }
}

const Hashtag = () => {
    let params = useParams();
    let tag = parseTag(params.hashtag);  
    
    const [trendDetail, setTrendDetail] = useState({firstSeen : '', trendingLocations: []});

    useEffect(() =>{
        fetchTrendData(tag,setTrendDetail);
    },[tag]);
    if(trendDetail.trendingLocations.length > 1){
        return (
            <div >
            <Helmet>
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
            </div>
            </div>
        )
    } else {
        return (
            <div >
            <Helmet>
                <title>Please Wait</title>
            </Helmet>
            </div>
        )
    }

}
export default Hashtag;