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
            <div className='footer'>
                Organized by
                <div className='vu-img-container'>
                    <img src="/vu.bmp" alt="Vilnius University logo">
                    </img>
                </div>
            </div>
        </CarouselProvider>
    )
}
