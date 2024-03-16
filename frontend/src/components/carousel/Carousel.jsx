import { useCarousel } from "../../context/CarouselProvider";

export default function Carousel() {
    const { carousel, carouselIsOpen, closeCarousel } = useCarousel();
    if(!carouselIsOpen) return null;    
    return (
        <div className="carousel">
            <div className="carousel-content">
                <span className="close" onClick={closeCarousel}>&times;</span>
                <img src={carousel[0].url} alt={carousel[0].alt}></img>
            </div>
        </div>
    )
}