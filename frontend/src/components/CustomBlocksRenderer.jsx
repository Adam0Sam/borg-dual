import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { getStrapiURL } from '../utils/api';
import { useCarousel } from '../context/CarouselProvider';

const BASE_URL = 'bebras.org';
const ALT_BASE_URL = 'borg.licejus.lt';

export default function CustomBlocksRenderer({ content, openCarouselModal, customBlocks = {} }) {
    const { addToCarousel, getCarouselLength } = useCarousel();

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
        const url = getStrapiURL(new URL(image.url).pathname);
        addToCarousel({ url: url, alt: image.alternativeText })
        let imageId = getCarouselLength() - 1;
        return (
            <img className='clickable' data-id={imageId} onClick={()=>openCarouselModal(imageId)} src={url} alt={image.alternativeText} />
        );
    };

    const renderLink = ({ url, children }) => {
        const newUrl = new URL(url);
        if (newUrl.hostname === ALT_BASE_URL) {
            newUrl.hostname = BASE_URL;
            url = newUrl.toString();
        }
        return <a href={url}>{children}</a>;
    };

    return (
        <BlocksRenderer
            content={content}
            blocks={{
                paragraph: ({ children }) => renderParagraph(children),
                image: (props) => renderImage(props),
                link: (props) => renderLink(props),
                ...customBlocks
            }}
        />
    );
}
