import { getStrapiURL } from "../utils/api";

export default function ImageGalleries({ imageGalleries }) {
    return (
        imageGalleries.map((gallery) => {
            return (
                <>
                    <h1>{gallery.name}</h1>
                    <h4>{gallery.info}</h4>
                    <div className="info-row-container">
                        {
                            gallery.images.data.map((image) => {
                                return (

                                    <img
                                        src={getStrapiURL(image.attributes?.url)}>
                                    </img>

                                )
                            })
                        }
                    </div>
                </>
            )
        })
    )
}