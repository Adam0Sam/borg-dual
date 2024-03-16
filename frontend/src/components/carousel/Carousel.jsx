import { useCarousel } from "../../context/CarouselProvider";
// import { RiArrowRightSLine, RiArrowLeftSLine } from "@remixicon/react";
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";

import './carousel.css'

const Carousel = forwardRef(function ({ closeCarouselModal }, ref) {
    const { carousel } = useCarousel();
    const [currentImageId, setCurrentImageId] = useState(0);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 780);

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImageId((prev) => {
            if (prev === carousel.length - 1) return 0;
            return prev + 1;
        });
    }

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImageId((prev) => {
            if (prev === 0) return carousel.length - 1;
            return prev - 1;
        });
    }

    useImperativeHandle(ref, () => ({
        setCurrentImageId: (id) => {
            if(!id) return;
            if (id < 0 || id >= carousel.length) return;
            if(!carousel[id]) return;
            setCurrentImageId(id);
        }
    }))

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 780);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    let carouselContent;
    if (carousel.length <= 0) carouselContent = null;
    else if (isSmallScreen) {
        carouselContent = (
            <>
                <div className="carousel__content">
                    <img src={carousel[currentImageId].url} alt={carousel[currentImageId].alt}></img>
                </div>
                <div className="mobile-controls">
                    <button className="carousel-arrow l-arrow" onClick={(e) => prevImage(e)}>
                        <RiArrowLeftSLine />
                    </button>
                    <button className="carousel-arrow r-arrow" onClick={(e) => nextImage(e)}>
                        <RiArrowRightSLine />
                    </button>
                </div>
            </>
        )
    } else {
        carouselContent = (
            <>
                <button className="carousel-arrow l-arrow" onClick={(e)=>prevImage(e)}>
                    <RiArrowLeftSLine />
                </button>
                <div className="carousel__content">
                    <img src={carousel[currentImageId].url} alt={carousel[currentImageId].alt}></img>
                </div>
                <button className="carousel-arrow r-arrow" onClick={(e)=>nextImage(e)}>
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
});

export default Carousel;