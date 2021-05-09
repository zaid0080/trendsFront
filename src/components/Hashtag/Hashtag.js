import Helmet from 'react-helmet';
import { useParams } from 'react-router';
import urlencode from 'urlencode';

function parseTag(tag){
    tag = urlencode.decode(tag);
    if(tag[0] == '_'){
        return tag.replace('_','#');
    }
    return tag;
}
const Hashtag = () => {
    let {hashtag:tag} = useParams();
    tag = parseTag(tag);
    return (
        <div >
        <Helmet>
            <title>{tag}</title>
        </Helmet>
        <h1>Hello, {tag}</h1>
        <p>Consequat irure velit nulla fugiat ut consectetur enim non.</p>
        </div>
    )
}

export default Hashtag;