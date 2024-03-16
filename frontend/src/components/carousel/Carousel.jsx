import { useCarousel } from "../../context/CarouselProvider";
import { RiArrowRightSLine, RiArrowLeftSLine } from "@remixicon/react";
import { useState } from "react";
import './carousel.css'

export default function Carousel({ closeCarouselModal }) {
    const { carousel } = useCarousel();
    const [currentImageId, setCurrentImageId] = useState(0);

    const nextImage = () => {
        setCurrentImageId((prev) => {
            if (prev === carousel.length - 1) return 0;
            return prev + 1;
        });
    }

    const prevImage = () => {
        setCurrentImageId((prev) => {
            if (prev === 0) return carousel.length - 1;
            return prev - 1;
        });
    }

    return (
            <div className="carousel">
                <button className="carousel-arrow l-arrow" onClick={prevImage}>
                    <RiArrowLeftSLine />
                </button>
                <div className="carousel__content">
                    <img src={carousel[currentImageId].url} alt={carousel[currentImageId].alt}></img>
                </div>
                <button className="carousel-arrow r-arrow" onClick={nextImage}>
                    <RiArrowRightSLine />
                </button>
            </div>
    )
}