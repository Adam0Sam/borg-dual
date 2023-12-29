import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import fetchAPI from '../utils/api';
import { getStrapiURL } from "../utils/api";

import CustomBlocksRenderer from "../components/CustomBlocksRenderer";

function RichTextComponent({ text }) {
    return (
        <>
            {text.map((element) => {
                return (
                    <>
                        <CustomBlocksRenderer
                            content={element.TextInstance}
                        />
                        <br></br>
                        <p>-----------------------------------</p>
                    </>
                )
            })}
        </>
    )

}

function CountriesComponent({ countries }) {
    return (
        <>
            {countries.map((country) => {
                return (
                    <>
                        <div>
                            <h4>{country.name}</h4>
                            <p>{country.info}</p>
                            <a href={`http://${country.url}`} target="_blank" rel="noreferrer">
                                <img
                                    src={getStrapiURL(country.flag.data.attributes?.url)}
                                    alt={`${country.name}`}>
                                </img>
                            </a>
                        </div>
                        <p>-----------------------------</p>
                    </>
                )
            })}
        </>
    )
}

function LogoComponent({ logos }) {
    return (
        <>
            {
                logos.map((logo) => {
                    return (
                        <>
                            <div>
                                <img
                                    src={getStrapiURL(logo.logo?.data?.attributes?.url)}
                                    alt={`${logo.name}`}>
                                </img>
                                <p>{logo.name}</p>
                            </div>
                            <p>-----------------------------</p>
                        </>
                    )
                })


            }
        </>
    )
}

function EventComponent({ events }) {

    return (
        <>
            {
                events.map((event) => {
                    return (
                        <>
                            <h3>{event.year}</h3>
                            <RichTextComponent
                                text={event.RichText}
                            />
                        </>
                    )
                })
            }
        </>
    )
}

function PublicationContentComponent({ publicationLinks }) {
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
            <RichTextComponent text={publicationContent} />
        </>
    )

}

function PublicationComponent({ publicationButtons }) {
    const [publicationLinks, setPublicationLinks] = useState([]);
    const publicationBtnRef = useRef(null);
    const [activeButtonIndex, setActiveButtonIndex] = useState(0);

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
        <>
            <div className="buttonContainer">
                {
                    publicationButtons.map((publicationButton, index) => {
                        return <button
                            ref={index === 0 ? publicationBtnRef : null}
                            onClick={() => handleClick(publicationButton.PublicationLink, index)}
                            data-name={publicationButton.name}
                            key={publicationButton.name}
                            className={index === activeButtonIndex ? "publication-btn-active" : ""}
                        >
                            {publicationButton.name}
                        </button>
                    })
                }
            </div>
            <div>
                {publicationLinks.length > 0 &&
                    < PublicationContentComponent
                        publicationLinks={publicationLinks}
                    />}

            </div>
        </>
    )
}

export default function CustomPage() {
    const params = useParams();
    const postSlug = params.slug;
    const [content, setContent] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchContent = async () => {
        try {
            const data = await fetchAPI(`/api/pages/${postSlug}`);
            setContent(data.data.attributes);
            setLoading(false);
        }
        catch (err) {
            setError(err.status + ": " + err.statusText);
        }
    }

    useEffect(() => {
        fetchContent();
    }, [postSlug])


    const isIncluded = (component, content) => {
        if (content[component]?.length > 0) {
            return true;
        }
        return false;
    }
    const modifyArray = (textArray, type) => {
        const textToReverse = ["events", "news"];
        if (textToReverse.includes(type)) {
            return [...textArray].reverse();
        }
        return textArray;

    }

    return (
        <div>
            <h1>{content.name}</h1>
            {isIncluded("RichText", content) && < RichTextComponent text={modifyArray(content.RichText, postSlug)} />}
            {isIncluded("Countries", content) && < CountriesComponent countries={content.Countries} />}
            {isIncluded("Logos", content) && < LogoComponent logos={content.Logos} />}
            {isIncluded("Events", content) && < EventComponent events={modifyArray(content.Events, postSlug)} />}
            {isIncluded("PublicationButtons", content) && < PublicationComponent publicationButtons={content.PublicationButtons} />}
        </div>
    )
}
