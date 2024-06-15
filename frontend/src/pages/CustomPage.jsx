import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { fetchApiContent } from '../utils/api';
// Custom components
import RichText from "../components/rich-text/RichText";
import PublicationOuter from "../components/publications/PublicationOuter";
import Events from "../components/events/Events";
import Logos from "../components/logos/Logos";
import Countries from "../components/countries/Countries";
import Tasks from "../components/tasks/Tasks";
import ImageGallery from "../components/image-gallery/ImageGallery";
import Carousel from "../components/carousel/Carousel";
import InsertedHTML from "../components/inserted-html/InsertedHTML";
import AlertMessage from "../components/AlertMessage";

import LoadingWheel from "../components/wheel/LoadingWheel";
import Modal from "../components/modal/Modal";
import ErrorModal from "../components/modal/ErrorModal";

import { useCarousel } from "../context/CarouselProvider";

/**
 * Renders a page component based on its type.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.component - The component object.
 * @param {string} props.postSlug - The post slug.
 * @returns {JSX.Element|null} The rendered page component.
 */
const PageComponent = ({ component, pageSlug, openCarouselModal }) => {
    switch (component.type) {
        case "rich-text":
            return <RichText currentSlug={pageSlug} text={component.content} />;
        case "ck-editor":
            return <InsertedHTML html={component.content[0].CKEditor} />;
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
            return <ImageGallery imageGalleries={component.content} openCarouselModal={openCarouselModal} />;
        case "alert":
            return <AlertMessage message={component.content}/>
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
    console.log(constructedComponents)
    return constructedComponents;
}

const getNormalizedSlug = (slug) => {
    const homePageSlugs = ['what-is-bebras', '/']
    if (homePageSlugs.includes(slug)) return 'home'
    if (slug.slice(-4) === 'html') return slug.slice(0, -5)
    return slug
}

const slugExists = async (slug) => {
    try {
        await fetchApiContent(`/api/pages/${slug}`)
        return true
    } catch (error) {
        return false
    }
}

/**
 * CustomPage component.
 * Renders a custom page with dynamic content.
 * @returns {JSX.Element} The rendered CustomPage component.
 */
export default function CustomPage({ passedSlug }) {
    const params = useParams();
    const pageSlug = getNormalizedSlug(passedSlug || params?.slug);
    const navigate = useNavigate();

    const { clearCarousel } = useCarousel();
    const carouselModalRef = useRef(null);
    const carouselRef = useRef(null);

    const [pageContent, setPageContent] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        slugExists(pageSlug).then((exists) => {
            if (!exists) {
                navigate('/')
            } else {
                fetchApiContent(`/api/pages/${pageSlug}`)
                    .then((data) => {
                        // if no hash is present, then scroll to page top
                        if (!window.location.hash) {
                            // why does scroll-behavior: smooth result in the window not scrolling to the top?
                            window.scrollTo({ top: 0 });
                        }
                        setPageContent(data);
                        clearCarousel();
                        setError(null);
                    })
                    .catch((err) => {
                        setError(err.message);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        });
    }, [pageSlug, clearCarousel, navigate]);


    // prop drilling with these functions is not very good but what can I do?
    /**
     * Opens the carousel modal.
     */
    const openCarouselModal = (id) => {
        carouselModalRef.current.open();
        carouselRef.current.setCurrentImageId(id);
    }
    /**
     * Closes the carousel modal.
     */
    const closeCarouselModal = () => {
        carouselModalRef.current.close();
    }

    if (loading) return (
        <Modal openOnMount customClassNames='center'>
            <LoadingWheel />
        </Modal>
    )
    else if (error) {
        // if (error === "Error: Invalid data received") {
        //     navigate('/')
        // }
        return (
            <ErrorModal openOnMount customClassNames='center' status={500} errorMessage={error} />
        )
    }

    return (
        <>
            {pageContent.RichText.length > 0 &&
                (
                    <RichText currentSlug={pageSlug} text={modifyArray(pageContent.RichText, pageSlug)} title={pageContent.name} openCarouselModal={openCarouselModal} marginTop />
                )
            }
            {
                // very unlikely that PageContent structure will change mid-view thus index-key is a valid apporach
                parsePageContent(pageContent.PageContent).map((component, index) => {
                    return <PageComponent component={component} postSlug={pageSlug} key={index} openCarouselModal={openCarouselModal} />
                })
            }
            <Modal ref={carouselModalRef}>
                <Carousel ref={carouselRef} closeCarouselModal={closeCarouselModal} />
            </Modal>
        </>
    )
}
