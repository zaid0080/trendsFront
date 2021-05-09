import Helmet from 'react-helmet';
import { useParams } from 'react-router';

const Hashtag = () => {
    let {hashtag:tag} = useParams();
    return (
        <div >
        <Helmet>
            <title></title>
        </Helmet>
        <h1>Hello, {2*2}</h1>
        <p>Consequat irure velit nulla fugiat ut consectetur enim non.</p>
        </div>
    )
}

export default Hashtag;