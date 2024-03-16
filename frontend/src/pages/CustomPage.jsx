import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import fetchAPI from '../utils/api';
// Custom components
import RichText from "../components/rich-text/RichText";
import PublicationOuter from "../components/publications/PublicationOuter";
import Events from "../components/events/Events";
import Logos from "../components/logos/Logos";
import Countries from "../components/countries/Countries";
import Tasks from "../components/tasks/Tasks";
import ImageGallery from "../components/image-gallery/ImageGallery";
import Carousel from "../components/carousel/Carousel";

import LoadingWheel from "../components/wheel/LoadingWheel";
import Modal from "../components/modal/Modal";

import { useCarousel } from "../context/CarouselProvider";

/**
 * Renders a page component based on its type.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.component - The component object.
 * @param {string} props.postSlug - The post slug.
 * @returns {JSX.Element|null} The rendered page component.
 */
const PageComponent = ({ component, postSlug }) => {
    switch (component.type) {
        case "rich-text":
            return <RichText currentSlug={postSlug} text={component.content} />;
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

/**
 * Modifies an array based on the given type.
 * If the type is "events" or "news", the array will be reversed.
 * Otherwise, the array will remain unchanged.
 *
 * @param {Array} textArray - The array to be modified.
 * @param {string} type - The type of modification to be applied.
 * @returns {Array} - The modified array.
 */
const modifyArray = (textArray, type) => {
    const typeToReverse = ["events", "news"];
    if (typeToReverse.includes(type)) {
        return textArray.reverse();
    }
    return textArray;
}

/**
 * Parses the page content and constructs an array of components.
 * @param {Array<object>} pageContent - The page content to parse.
 * @returns {Array.<{ type: number, content: Array<object> }>} The constructed components.
 */
const parsePageContent = (pageContent) => {
    if (!pageContent) return;

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

/**
 * CustomPage component.
 * Renders a custom page with dynamic content.
 * @returns {JSX.Element} The rendered CustomPage component.
 */
export default function CustomPage() {
    const params = useParams();
    const postSlug = params.slug;

    const { clearCarousel } = useCarousel();

    const [pageContent, setPageContent] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    /**
     * Fetches the page content from the API.
     * @returns {Promise<object>} A promise that resolves to the fetched page content.
     */
    const fetchContent = useCallback(async () => {
        try {
            const data = await fetchAPI(`/api/pages/${postSlug}`);
            if (!data || !data.data || !data.data.attributes) {
                throw new Error("Invalid data received");
            }
            setLoading(false);
            return data.data.attributes;
        }
        catch (err) {
            setError(err.status + ": " + err.statusText);
            setLoading(false);
        }
    }, [postSlug]);

    useEffect(() => {
        fetchContent().then((data) => {
            // if no hash is present, then scroll to page top
            if (!window.location.hash) {
                // why does scroll-behavior: smooth result in the window not scrolling to the top?
                window.scrollTo({ top: 0 });
            }
            setPageContent(data);
            clearCarousel();
        })
    }, [fetchContent, clearCarousel]);



    if (loading) return (
        <Modal>
            <LoadingWheel />
        </Modal>
    )
    else if (error) return (
        <Modal>
            <h1 className='error: '>{error}</h1>
        </Modal>
    )

    return (
        <>
            {pageContent.RichText.length > 0 &&
                (
                    <div className="rich-container m-top">
                        <RichText currentSlug={postSlug} text={modifyArray(pageContent.RichText, postSlug)} title={pageContent.name} />
                    </div>
                )
            }
            {
                // very unlikely that PageContent structure will change mid-view thus index-key is a valid apporach
                parsePageContent(pageContent.PageContent).map((component, index) => {
                    return <PageComponent component={component} postSlug={postSlug} key={index} />
                })
            }
            <Carousel />
        </>
    )
}