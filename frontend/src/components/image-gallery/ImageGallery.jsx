import { getStrapiURL } from "../../utils/api";
import './gallery.css'

export default function ImageGallery({ imageGalleries }) {
    return (
        <div className="gallery-container m-top">
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
                                        return (
                                            <div className="gallery-img" key={image.id}>
                                                <img
                                                    alt={image.attributes?.alternativeText || image.attributes.name}
                                                    src={getStrapiURL(image.attributes?.url)}>
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