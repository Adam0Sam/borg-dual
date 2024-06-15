import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { getStrapiURL } from '../utils/api';
import { useCarousel } from '../context/CarouselProvider';
import { Link } from 'react-router-dom';

const BEBRAS_HOSTNAMES = ['borg.licejus.lt', 'bebras.org'];

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
            <img className='clickable' data-id={imageId} onClick={()=>openCarouselModal && openCarouselModal(imageId)} src={url} alt={image.alternativeText} />
        );
    };

    const renderLink = ({ url, children }) => {
        const urlObject = new URL(url);
        if (BEBRAS_HOSTNAMES.includes(urlObject.hostname)) {
            return <Link to={urlObject.pathname}>{children}</Link>;
        }
        return <a href={url}>{children}</a>;
    };

    const renderList = ({ children, format }) => {
        const ordered = format === 'ordered'
        if (ordered) {
            console.log(children)
            return <ol>{children}</ol>;
        }
        return <ul>{children}</ul>;
    }

    return (
        <BlocksRenderer
            content={content}
            blocks={{
                paragraph: ({ children }) => renderParagraph(children),
                image: (props) => renderImage(props),
                link: (props) => renderLink(props),
                list: (props) => renderList(props),
                ...customBlocks
            }}
        />
    );
}
