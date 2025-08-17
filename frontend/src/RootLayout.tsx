import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const RootLayout = () => {

    return (
        <>
            <div
                className="flex flex-col justify-between items-center gap-0 min-w-screen min-h-screen
                            bg-gradient-to-br from-gray-900 to-black"
                            >
                <Navbar />
                <div className="mx-auto w-full h-full">
                    <Outlet />
                </div>
                <div className="flex-1"></div>
                <Footer />
            </div>
        </>
    );
}

export default RootLayout;