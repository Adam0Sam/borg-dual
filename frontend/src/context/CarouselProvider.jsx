import { createContext, useContext, useRef, useCallback, useMemo } from "react";

const CarouselContext = createContext();
/**
 * Custom hook that provides access to the CarouselContext.
 * @returns {Object} The CarouselContext object.
 * @throws {Error} If used outside of an CarouselProvider.
 */
export const useCarousel = () => {
    const context = useContext(CarouselContext);
    if (!context) {
        throw new Error("useCarousel must be used within a CarouselProvider");
    }
    return context;
};

/**
 * Provides context for managing admin-related data.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {JSX.Element} The rendered component.
 */
export default function CarouselProvider({ children }) {
    // not sure if correct, but not using states here
    // to avoid rerenders in subscribed components
    const carousel = useMemo(() => [], []);
    let isOpen = useRef(false);
    const carouselIsOpen = isOpen.current;

    const addToCarousel = useCallback((image) => {
        carousel.push(image);
        console.log(carousel);
    }, [carousel]);

    const getCarouselLength = useCallback(() => {
        return carousel.length;
    }, [carousel.length]);

    const openCarousel = useCallback(() => {
        isOpen.current = true;
        console.log("Carousel is open");
    }, []);

    const closeCarousel = useCallback(() => {
        isOpen.current = false;
    }, [])

    const clearCarousel = useCallback(() => {
        carousel.length = 0;
    }, [carousel]);


    return (
        <CarouselContext.Provider value={{ carousel, addToCarousel, clearCarousel, getCarouselLength, carouselIsOpen, openCarousel, closeCarousel }}>
            {children}
        </CarouselContext.Provider>
    );
}