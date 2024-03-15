import { createContext, useContext, useState, useCallback } from "react";

const CarouselContext = createContext();
/**
 * Custom hook that provides access to the CarouselContext.
 * @returns {Object} The CarouselContext object.
 * @throws {Error} If used outside of an AdminProvider.
 */
export const useAdmin = () => {
    const context = useContext(CarouselContext);
    if (!context) {
        throw new Error("useAdmin must be used within a AdminProvider");
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
export default function AdminProvider({ children }) {
    const [carousel, setCarousel] = useState([]);

    const addToCarousel = useCallback((item) => {
        setCarousel((prevCarousel) => [...prevCarousel, item]);
    }, []);

    return (
        <CarouselContext.Provider value={{ carousel, addToCarousel }}>
            {children}
        </CarouselContext.Provider>
    );
}