import { useState, useEffect, useRef } from 'react';
import RichText from './RichText';

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
            <div className="buttonContainer">
                {publicationLinks.map((link, index) =>
                    <button
                        ref={index === 0 ? buttonRef : null}
                        onClick={() => handleClick(link.publication.data.attributes.RichText, index)}
                        key={link.name}
                        className={`
                        publication-content-button 
                        ${publicationLinks.length > 1 ? "visible" : ""} 
                        ${index === activeButtonIndex ? "publication-btn-active" : ""}
                        `}
                    >{link.name}
                    </button>
                )}
            </div>
            <RichText text={publicationContent} />
        </>
    )

}