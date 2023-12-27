import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const addNewRichTextLine = (children) => {
    if (children.length === 0) {
        return true;
    }
    if (children.length === 1 && children[0].props.text.length === 0) {
        return true;
    }
    return false;
}

function RichTextComponent({ text }) {



    return (
        <>
            {text.map((element) => {
                return (
                    <>
                        <BlocksRenderer
                            content={element.TextInstance}
                            blocks={{
                                paragraph: ({ children }) => {
                                    if (addNewRichTextLine(children)) {
                                        return <br></br>
                                    }
                                    return <p>{children}</p>
                                }
                            }}
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
    console.log("countries: ", countries);

    return (
        <>
            {countries.map((country) => {
                return (
                    <>
                        <div>
                            <h4>{country.name}</h4>
                            <p>{country.info}</p>
                            <a href={`http://${country.url}`} target="_blank">
                                <img
                                    src={`http://localhost:1337${country.flag.data.attributes?.url}`}
                                    alt={`${country.name} image`}>
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
    console.log("logos: ", logos);
    return (
        <>
            {
                logos.map((logo) => {
                    return (
                        <>
                            <div>
                                <img
                                    src={`http://localhost:1337${logo.logo?.data?.attributes?.url || ''}`}
                                    alt={`${logo.name} image`}>
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
                    console.log("event: ", event);
                    return (
                        <>
                            <h3>{event.year}</h3>
                            <BlocksRenderer
                                content={event.TextInstance}
                                blocks={{
                                    paragraph: ({ children }) => {
                                        if (addNewRichTextLine(children)) {
                                            return <br></br>
                                        }
                                        return <p>{children}</p>
                                    }
                                }}
                            />
                            <p>-----------------------------</p>
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

    const fetchContent = async () => {
        const res = await fetch(`http://localhost:1337/api/pages/${postSlug}`);
        const obj = await res.json();
        setContent(obj.data.attributes);
        // console.log("page content: ", obj.data.attributes);
    }

    useEffect(() => {
        fetchContent();
    }, [postSlug])

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
