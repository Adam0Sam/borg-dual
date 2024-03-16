import { useCarousel } from "../../context/CarouselProvider";
// import { RiArrowRightSLine, RiArrowLeftSLine } from "@remixicon/react";
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import { useEffect, useState } from "react";
import './carousel.css'

export default function Carousel({ closeCarouselModal }) {
    const { carousel } = useCarousel();
    const [currentImageId, setCurrentImageId] = useState(0);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImageId((prev) => {
            if (prev === carousel.length - 1) return 0;
            return prev + 1;
        });
    }

    const prevImage = (e) => {
        e.stopPropagation();
        console.log('next image', e);
        setCurrentImageId((prev) => {
            if (prev === 0) return carousel.length - 1;
            return prev - 1;
        });
    }

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    let carouselContent;
    if (isSmallScreen) {
        carouselContent = (
            <>
                <div className="carousel__content">
                    <img src={carousel[currentImageId].url} alt={carousel[currentImageId].alt}></img>
                </div>
                <div className="mobile-controls">
                    <button className="carousel-arrow l-arrow" onClick={()=>prevImage()}>
                        <RiArrowLeftSLine />
                    </button>
                    <button className="carousel-arrow r-arrow" onClick={()=>nextImage()}>
                        <RiArrowRightSLine />
                    </button>
                </div>
            </>
        )
    } else {
        carouselContent = (
            <>
                <button className="carousel-arrow l-arrow" onClick={prevImage}>
                    <RiArrowLeftSLine />
                </button>
                <div className="carousel__content">
                    <img src={carousel[currentImageId].url} alt={carousel[currentImageId].alt}></img>
                </div>
                <button className="carousel-arrow r-arrow" onClick={nextImage}>
                    <RiArrowRightSLine />
                </button>
            </>
        )
    }

    return (
        <div className="carousel" onClick={closeCarouselModal}>
            {carouselContent}
        </div>
    )
}