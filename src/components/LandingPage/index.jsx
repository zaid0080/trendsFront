import Header from '../Header/Header.js';
import {Content} from '../Content/Content.js';
import Helmet from 'react-helmet';

export default function Landingpage() {
    return (
        <div id = 'landing-page'>
        <Helmet>
            <title>All Day Trends</title>
        </Helmet>
         <Header />
         <Content />
        </div>
    )
}
