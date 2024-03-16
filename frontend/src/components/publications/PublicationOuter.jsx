import { useState, useEffect, useRef } from 'react';
import PublicationInner from './PublicationInner';
import './publications.css';

export default function PublicationOuter({ publicationButtons }) {
    const [publicationLinks, setPublicationLinks] = useState([]);
    const publicationBtnRef = useRef(null);
    const [activeButtonIndex, setActiveButtonIndex] = useState(0);

    // simulate first click
    useEffect(() => {
        if (publicationBtnRef.current) {
            publicationBtnRef.current.click();
        }
    }, [])

    const handleClick = (links, index) => {
        setPublicationLinks(links);
        setActiveButtonIndex(index);
    }

    return (
        <div className='container publications'>
            <div className="publication__buttons outer-buttons">
                {
                    publicationButtons.map((publicationButton, index) => {
                        return <button
                            ref={index === 0 ? publicationBtnRef : null}
                            onClick={() => handleClick(publicationButton.PublicationLink, index)}
                            data-name={publicationButton.name}
                            key={publicationButton.name}
                            className={`pub-button outer-button ${index === activeButtonIndex ? "active" : ""}`}>
                            {publicationButton.name}
                        </button>
                    })
                }
            </div>
            <div>
                {publicationLinks.length > 0 &&
                    <PublicationInner
                        publicationLinks={publicationLinks}
                    />}

            </div>
        </div>
    )
}