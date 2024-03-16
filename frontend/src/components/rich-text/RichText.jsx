import { useEffect, useMemo } from "react";
import CustomBlocksRenderer from "../CustomBlocksRenderer";
import './richText.css';

const sectionedPages = ['news', 'events'];
const SYMBOLS_TO_REMOVE = ['"', '“'];


/**
 * Renders rich text content with optional sections and smooth scrolling to hash links.
 * @param {Object} props - The component props.
 * @param {Array} props.text - The array of text elements to render.
 * @param {string} props.title - The title of the rich text.
 * @param {string} props.currentSlug - The current slug for the page.
 * @returns {JSX.Element} The rendered rich text component.
 */
export default function RichText({ text, title, currentSlug, openCarouselModal }) {

    const hasSections = useMemo(() => sectionedPages.includes(currentSlug), [currentSlug]);
    const { hash } = window.location;

    useEffect(() => {
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({
                    behavior: "smooth",
                    block: 'start',
                    inline: 'nearest'
                });
                element.classList.add('highlight');
            }
        }
    }, [hash]);

    const richContent = (
        <>
            {text.map((element) => {
                if (hasSections) {
                    const sectionTitle = element?.TextInstance[0]?.children[0]?.text;
                    const formattedTitle = sectionTitle?.replace(/\s/g, '-').replace(/["“”]/g, '');
                    return (
                        <section className={`rich-wrapper id-${element.id}`} id={formattedTitle || element.id} key={element.id}>
                            <CustomBlocksRenderer
                                content={element.TextInstance}
                                openCarouselModal={openCarouselModal}
                            />
                        </section>
                    );
                }
                return (
                    <div className={`rich-wrapper`} key={element.id}>
                        <CustomBlocksRenderer
                            content={element.TextInstance}
                            openCarouselModal={openCarouselModal}
                        />
                    </div>
                );
            })}
        </>
    );

    return (
        <>
            <h1>{title}</h1>
            {richContent}
        </>
    );
}