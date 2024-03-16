import React, { createContext, useContext, useCallback, useMemo } from "react";

const CarouselContext = createContext();

export const useCarousel = () => {
    const context = useContext(CarouselContext);
    if (!context) {
        throw new Error("useCarousel must be used within a CarouselProvider");
    }
    return context;
};

export default function CarouselProvider({ children }) {
    const carousel = useMemo(() => [], []);

    const addToCarousel = useCallback((image) => {
        carousel.push(image);
        console.log(carousel);
    }, [carousel]);

    const getCarouselLength = useCallback(() => {
        return carousel.length;
    }, [carousel.length]);

    const clearCarousel = useCallback(() => {
        carousel.length = 0;
    }, [carousel]);


    return (
        <CarouselContext.Provider value={{ carousel, addToCarousel, clearCarousel, getCarouselLength }}>
            {children}
        </CarouselContext.Provider>
    );
}