import { Outlet } from "react-router-dom";
import CarouselProvider from "../context/CarouselProvider";
import MenuNav from "../components/MenuNav";

export default function RootLayout() {
    return (
        <CarouselProvider>
            <MenuNav />
            <main className="main">
                <Outlet />
            </main>
        </CarouselProvider>
    )
}