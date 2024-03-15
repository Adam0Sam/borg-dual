import { useState, useEffect } from 'react';
import fetchAPI from '../utils/api';
// Home Page components
import CustomBlocksRenderer from '../components/CustomBlocksRenderer';
import InfoRow from '../components/info-row/InfoRow';
import TaskRow from '../components/TaskRow';

import LoadingWheel from '../components/wheel/LoadingWheel';
import Modal from '../components/modal/Modal';

export default function Home() {
    const [content, setContent] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchContent = async () => {
        try {
            const data = await fetchAPI('/api/home-page?populate=deep');
            setContent(data.data.attributes);
            setLoading(false);
        }
        catch (err) {
            setError(err.status + ": " + err.statusText);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchContent();
    }, [])

    let returnContent = null;
    if (loading) {
        returnContent =
            (
                <Modal openOnMount customClassNames='center'>
                    <LoadingWheel />
                </Modal>
            )
    }
    else if (error) {
        returnContent = (
            <Modal openOnMount customClassNames='center'>
                <h1 className='error'>{error}</h1>
            </Modal>
        )
    }
    else if (!(content.Alert && content.InfoRowOne && content.InfoRowTwo)) {
        returnContent = (
            <Modal>
                <h1 className='error'>Missing content</h1>
            </Modal>
        )
    }
    else returnContent = (
        <>
            <div className='alert-message'>
                <CustomBlocksRenderer content={content.Alert.TextInstance} />
            </div>
            <InfoRow infoRow={content.InfoRowOne} customClass={'row-one'} />
            <TaskRow taskLinks={content.TaskLinks} />
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
