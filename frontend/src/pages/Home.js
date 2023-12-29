import { useState, useEffect } from 'react';
import fetchAPI from '../utils/api';
import { getStrapiURL } from '../utils/api';

import CustomBlocksRenderer from '../components/CustomBlocksRenderer';

const InfoRowComponent = ({ infoRow }) => {
    console.log(infoRow)
    return (
        <div className='info-row-container'>
            {infoRow.map((info) => {
                return (
                    <div>
                        <h3>{info.name}</h3>
                        <CustomBlocksRenderer content={info.TextInstance} />
                        <img
                            src={getStrapiURL(info.image.data.attributes?.url)}
                            alt={`${info.name}`}>
                        </img>
                    </div>
                )
            })}
        </div>
    )
}

export default function Home() {
    const [content, setContent] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchContent = async () => {
        try {
            // modify home-page controller if you dont want to pass additional options
            const data = await fetchAPI('/api/home-page?populate=deep');
            setContent(data.data.attributes);
            setLoading(false);
        }
        catch (err) {
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
                            < InfoRowComponent infoRow={content.InfoRowOne} />
                            < InfoRowComponent infoRow={content.InfoRowTwo} />
                        </>
                    ) :
                    (<h1>Missing content</h1>)
            }
        </div>
    )
}