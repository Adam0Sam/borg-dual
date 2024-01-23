import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchAPI from '../utils/api';

import RichText from "../components/RichText";
import PublicationOuter from "../components/PublicationOuter";
import Events from "../components/Events";
import Logos from "../components/Logos";
import Countries from "../components/Countries";
import Tasks from "../components/Tasks";
import ImageGalleries from "../components/ImageGalleries";

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
        window.scrollTo(0, 0);
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
            {isIncluded("RichText", content) && < RichText text={modifyArray(content.RichText, postSlug)} />}
            {isIncluded("Countries", content) && < Countries countries={content.Countries} />}
            {isIncluded("Logos", content) && < Logos logos={content.Logos} />}
            {isIncluded("Events", content) && < Events events={modifyArray(content.Events, postSlug)} />}
            {isIncluded("PublicationButtons", content) && < PublicationOuter publicationButtons={content.PublicationButtons} />}
            {isIncluded("TaskLinks", content) && < Tasks taskLinks={content.TaskLinks} type="page" />}
            {isIncluded("ImageGalleries", content) && < ImageGalleries imageGalleries={content.ImageGalleries}/>}
        </div>
    )
}
