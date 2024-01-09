import { useState, useEffect } from 'react';
import fetchAPI from '../utils/api';

import CustomBlocksRenderer from '../components/CustomBlocksRenderer';
import InfoRow from '../components/InfoRow';
import Tasks from '../components/Tasks';


export default function Home() {
    const [content, setContent] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchContent = async () => {
        try {
            // modify home-page controller if you dont want to pass additional options
            const data = await fetchAPI('/api/home-page?populate=deep');
	console.log("data: ", data.data.attributes);            
setContent(data.data.attributes);
            setLoading(false);
        }
        catch (err) {
		console.log("myerr: ", err);
            setError(err.status + ": " + err.statusText);
        }
    }

    useEffect(() => {
        fetchContent();
    }, [])


    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>{error}</h1>



    return (
        <div>
            {
                (content.Alert && content.InfoRowOne && content.InfoRowTwo) ?
                    (
                        <>
                            <CustomBlocksRenderer content={content.Alert.TextInstance} />
                            < InfoRow infoRow={content.InfoRowOne} />
                            < Tasks taskLinks={content.TaskLinks} type="home" />
                            < InfoRow infoRow={content.InfoRowTwo} />
                        </>
                    ) :
                    (<h1>Missing content</h1>)
            }
        </div>
    )
}
