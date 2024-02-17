import { useState, useEffect } from 'react';
import fetchAPI from '../utils/api';
// Home Page components
import CustomBlocksRenderer from '../components/CustomBlocksRenderer';
import InfoRow from '../components/info-row/InfoRow';
import Tasks from '../components/Tasks';

export default function Home() {
    const [content, setContent] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchContent = async () => {
        try {
            const data = await fetchAPI('/api/home-page?populate=deep');
            console.log("mydata: ", data);
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

    let returnContent = null;
    if (loading) returnContent = <h1>Loading...</h1>
    if (error) returnContent = <h1 className='error'>{error}</h1>
    if (!(content.Alert && content.InfoRowOne && content.InfoRowTwo)) returnContent = <h1 className='error'>Missing content</h1>
    else returnContent = (
        <>
            <div className='alert-message'>
                <CustomBlocksRenderer content={content.Alert.TextInstance} />
            </div>
            <InfoRow infoRow={content.InfoRowOne} customClass={'row-one'} />
            <Tasks taskLinks={content.TaskLinks} type="home" />
            <InfoRow infoRow={content.InfoRowTwo} customClass={'row-two'} />
            <div className='footer'>
                VU Temp
            </div>
        </>
    )


    return (
        <div className='home'>
            {returnContent}
        </div>
    )
}
