import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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

    // TODO: Make this more generic
    const hasRichText = (content) => {
        if (content.RichText?.length > 0) {
            return true;
        }
        return false;
    }
    const modifyArray = (textArray, type) => {
        switch (type) {
            case 'news':
                return [...textArray].reverse();
            case 'events':
                return [...textArray].reverse();
            default:
                return textArray;
        }
    }

    const hasCountries = (content) => {
        if (content.Countries?.length > 0) {
            return true;
        }
        return false;
    }

    const hasLogo = (content) => {
        if (content.Logos?.length > 0) {
            return true;
        }
        return false;
    }

    const hasEvent = (content) => {
        if (content.Events?.length > 0) {
            return true;
        }
        return false;
    }

    return (
        <div>
            <h1>{content.name}</h1>
            {hasRichText(content) && < RichTextComponent text={modifyArray(content.RichText, postSlug)} />}
            {hasCountries(content) && < CountriesComponent countries={content.Countries} />}
            {hasLogo(content) && < LogoComponent logos={content.Logos} />}
            {hasEvent(content) && < EventComponent events={modifyArray(content.Events, postSlug)} />}
        </div>
    )
}
