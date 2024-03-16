import { getStrapiURL } from "../../utils/api";
import { useCarousel } from "../../context/CarouselProvider";
import './gallery.css'

export default function ImageGallery({ imageGalleries, openCarouselModal }) {
    const { addToCarousel, getCarouselLength } = useCarousel();

    return (
        <div className="container gallery-container m-top">
            {
                imageGalleries.map((gallery) => {
                    return (
                        <div className="gallery" key={gallery.id}>
                            <div className="gallery__info">
                                <h3 className="gallery-name">{gallery.name}</h3>
                                <h5 className="gallery-info">{gallery.info}</h5>
                            </div>
                            <div className="gallery__images">
                                {
                                    gallery.images.data.map((image) => {
                                        addToCarousel({ url: getStrapiURL(image.attributes?.url), alt: image.attributes?.alternativeText })
                                        const imageId = getCarouselLength() - 1;
                                        return (
                                            <div className="gallery-img" key={image.id}>
                                                <img
                                                    className="clickable"
                                                    alt={image.attributes?.alternativeText || image.attributes.name}
                                                    src={getStrapiURL(image.attributes?.url)}
                                                    onClick={(e)=>openCarouselModal(e)}>
                                                </img>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}