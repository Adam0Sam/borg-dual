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
import { Link } from 'react-router-dom';

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
            <div>
                <TaskRow taskLinks={content.TaskLinks} />
                <div className='temp-container'>
                    Everyone can do it. The Bebras challenges are made of a set of short problems called Bebras tasks and are delivered online. The tasks are fun, engaging and based on problems that computer scientists often meet and enjoy solving. The tasks can be solved without prior knowledge but instead require logical thinking. The aim is to solve as many as you can in the allotted time.
                    
                    More information <Link to='/what-is-a-bebras-task'>here</Link>.
                </div>
            </div>
            <InfoRow infoRow={content.InfoRowTwo} customClass={'row-two'} />
        </>
    )


    return (
        <div className='home'>
            {returnContent}
        </div>
    )
}
