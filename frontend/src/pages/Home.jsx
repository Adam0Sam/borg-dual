import { useState, useEffect } from 'react';
import { fetchApiContent } from '../utils/api';
// Home Page components
import CustomBlocksRenderer from '../components/CustomBlocksRenderer';
import InfoRow from '../components/info-row/InfoRow';
import TaskRow from '../components/TaskRow';
// complementary components
import LoadingWheel from '../components/wheel/LoadingWheel';
import Modal from '../components/modal/Modal';
import ErrorModal from '../components/modal/ErrorModal';

/**
 * Renders the Home page component.
 * @returns {JSX.Element} The rendered Home page component.
 */
export default function Home() {
    const [content, setContent] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApiContent('/api/home-page?populate=deep')
            .then((data) => {
                setContent(data);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            })
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
            <ErrorModal openOnMount customClassNames='center' status={500} errorMessage={error} />
        )
    }
    else if (!(content.Alert && content.InfoRowOne && content.InfoRowTwo)) {
        returnContent = (
            <ErrorModal openOnMount customClassNames='center' status={500} errorMessage='Missing content in Strapi API' />
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
