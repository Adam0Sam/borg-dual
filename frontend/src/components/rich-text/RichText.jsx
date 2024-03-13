import { useEffect, useMemo } from "react";
import CustomBlocksRenderer from "../CustomBlocksRenderer";
import './richText.css';

const sectionedPages = ['news'];

export default function RichText({ text, title, currentSlug }) {

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
                    const formattedTitle = sectionTitle?.replace(/\s/g, '-');
                    return (
                        <section className={`rich-wrapper id-${element.id}`} id={formattedTitle || element.id} key={element.id}>
                            <CustomBlocksRenderer
                                content={element.TextInstance}
                            />
                        </section>
                    );
                }
                return (
                    <div className={`rich-wrapper`} key={element.id}>
                        <CustomBlocksRenderer
                            content={element.TextInstance}
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