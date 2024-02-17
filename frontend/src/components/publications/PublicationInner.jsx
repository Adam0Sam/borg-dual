import { useState, useEffect, useRef } from 'react';
import RichText from '../rich-text/RichText';

export default function PublicationInner({ publicationLinks }) {
    const [publicationContent, setPublicationContent] = useState([]);
    const buttonRef = useRef(null);
    const [activeButtonIndex, setActiveButtonIndex] = useState(0);

    useEffect(() => {
        if (buttonRef.current) {
            buttonRef.current.click();
        }
    }, [publicationLinks])

    const handleClick = (text, index) => {
        setPublicationContent(text);
        setActiveButtonIndex(index);
    }

    return (
        <>
            <div className={`publication__buttons inner-buttons ${publicationLinks.length > 1 ? "visible" : ""} `}>
                {publicationLinks.map((link, index) =>
                    <button
                        ref={index === 0 ? buttonRef : null}
                        onClick={() => handleClick(link.publication.data.attributes.RichText, index)}
                        key={link.name}
                        className={`pub-button inner-button ${index === activeButtonIndex ? "active" : ""}`}>
                        {link.name}
                    </button>
                )}
            </div>
            <div className='rich-container'>
                <RichText text={publicationContent} />
            </div>
        </>
    )

}