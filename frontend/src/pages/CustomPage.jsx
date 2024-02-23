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
    const [content, setContent] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchContent = async () => {
        try {
            const data = await fetchAPI(`/api/pages/${postSlug}`);
            setContent(data.data.attributes);
            setLoading(false);
            return data;
        }
        catch (err) {
            setError(err.status + ": " + err.statusText);
        }
    }
    
    
    useEffect(() => {
        fetchContent().then(() => {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth'});
            }, 1);
        })
    }, [postSlug]);


    const isIncluded = (component, content) => {
        if (content[component]?.length > 0) {
            return true;
        }
        return false;
    }

    const modifyArray = (textArray, type) => {
        const typeToReverse = ["events", "news"];
        if (typeToReverse.includes(type)) {
            return [...textArray].reverse();
        }
        return textArray;
    }

    if (loading) return <h1>Loading....</h1>
    if (error) return <h1 className="error">{error}</h1>

    return (
        <>
            {isIncluded("RichText", content) &&
                (
                    <div className="rich-container m-top">
                        <RichText text={modifyArray(content.RichText, postSlug)} title={content.name} />
                    </div>
                )
            }
            {isIncluded("Countries", content) && <Countries countries={content.Countries} />}
            {isIncluded("Logos", content) && <Logos logos={content.Logos} />}
            {isIncluded("Events", content) && <Events events={modifyArray(content.Events, postSlug)} />}
            {isIncluded("PublicationButtons", content) && <PublicationOuter publicationButtons={content.PublicationButtons} />}
            {isIncluded("TaskLinks", content) && <Tasks taskLinks={content.TaskLinks} />}
            {isIncluded("ImageGalleries", content) && <ImageGallery imageGalleries={content.ImageGalleries} />}
        </>
    )
}
