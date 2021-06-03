import { useContext } from 'react';
import {Content} from '../Content/Content.js';
import Helmet from 'react-helmet';
import { GlobalContext } from "../../global";


export default function Landingpage() {
  const { country, city } = useContext(GlobalContext);

    return (
        <div id = 'landing-page'>
        <Helmet>
            <title>{city === undefined ? country : city + ', ' + country} • Top Twitter Trending Hashtags and Topics Today</title>
        </Helmet>
         <Content />
        </div>
    )
}
