import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchAPI from '../utils/api';
// Custom components
import RichText from "../components/rich-text/RichText";
import PublicationOuter from "../components/publications/PublicationOuter";
import Events from "../components/wip/Events";
import Logos from "../components/logos/Logos";
import Countries from "../components/countries/Countries";
import Tasks from "../components/tasks/Tasks";
import ImageGallery from "../components/image-gallery/ImageGallery";

export default function CustomPage() {
    const params = useParams();
    const postSlug = params.slug;
    const [page, setPage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const parsePageContent = (pageContent) => {

        if (!pageContent) return;

        /** 
         Array representing constructed components.
         @type {Array.<{ type: number, content: Array<object> }>}
        */

        const constructedComponents = [];

        let prevComponentType = null;
        for (let i = 0; i < pageContent.length; i++) {
            if (!prevComponentType) {
                prevComponentType = (pageContent[i].__component).split('.')[1];
                constructedComponents.push({
                    type: prevComponentType,
                    content: [pageContent[i]]
                });
                continue;
            }

            const currComponentType = (pageContent[i].__component).split('.')[1];

            if (currComponentType === prevComponentType) {
                constructedComponents[constructedComponents.length - 1].content.push(pageContent[i]);
                continue;
            }

            prevComponentType = currComponentType;
            constructedComponents.push({
                type: prevComponentType,
                content: [pageContent[i]]
            });
        }
        return constructedComponents;
    }

    const fetchContent = async () => {
        try {
            const data = await fetchAPI(`/api/pages/${postSlug}`);
            setPage(data.data.attributes);
            setLoading(false);
            return data.data.attributes;
        }
        catch (err) {
            setError(err.status + ": " + err.statusText);
        }
    }


    useEffect(() => {
        fetchContent().then((data) => {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                parsePageContent(data.PageContent);
            }, 1);
        })
    }, [postSlug]);

    const modifyArray = (textArray, type) => {
        const typeToReverse = ["events", "news"];
        if (typeToReverse.includes(type)) {
            return [...textArray].reverse();
        }
        return textArray;
    }

    if (loading) return <h1>Loading....</h1>
    if (error) return <h1 className="error">{error}</h1>

    const PageComponent = ({ component }) => {
        console.log(component);
        switch (component.type) {
            case "rich-text":
                return <RichText text={component.content} />;
            case "publication-button":
                return <PublicationOuter publicationButtons={component.content} />;
            case "event":
                return <Events events={component.content} />;
            case "logo":
                return <Logos logos={component.content} />;
            case "country":
                return <Countries countries={component.content} />;
            case "task-link":
                return <Tasks taskLinks={component.content} />;
            case "image-gallery":
                return <ImageGallery imageGalleries={component.content} />;
            default:
                return null;
        }
    }

    return (
        <div className='page-container'>
            {page.RichText.length > 0 &&
                (
                    <div className="rich-container m-top">
                        <RichText text={modifyArray(page.RichText, postSlug)} title={page.name} />
                    </div>
                )
            }
            {
                parsePageContent(page.PageContent).map((component) => {
                    return <PageComponent component={component} />
                })
            }
            {/* {isIncluded("Countries", content) && <Countries countries={content.Countries} />}
            {isIncluded("Logos", content) && <Logos logos={content.Logos} />}
            {isIncluded("Events", content) && <Events events={modifyArray(content.Events, postSlug)} />}
            {isIncluded("PublicationButtons", content) && <PublicationOuter publicationButtons={content.PublicationButtons} />}
            {isIncluded("TaskLinks", content) && <Tasks taskLinks={content.TaskLinks} />}
            {isIncluded("ImageGalleries", content) && <ImageGallery imageGalleries={content.ImageGalleries} />} */}
        </div>
    )
}