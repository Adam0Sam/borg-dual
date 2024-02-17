import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { getStrapiURL } from '../utils/api';

export default function CustomBlocksRenderer({ content, customBlocks = {} }) {
    const renderParagraph = (children) => {
        if (children.length === 0 || (children.length === 1 && children[0].props.text.length === 0)) {
            return <br />;
        }
        return <p>{children}</p>;
    };

    const renderImage = ({ image }) => {
        if (!image || !image.url) {
            return null; // Handle missing or invalid image data
        }
        const url = new URL(image.url);
        return <img src={getStrapiURL(url.pathname)} alt={image.alternativeText} />;
    };

    return (
        <BlocksRenderer
            content={content}
            blocks={{
                paragraph: ({ children }) => renderParagraph(children),
                image: (props) => renderImage(props),
                ...customBlocks
            }}
        />
    );
}
