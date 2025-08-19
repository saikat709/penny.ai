import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import useSession from "./hooks/useSession";
import useAuth from "./hooks/useAuth";
import Swal from "sweetalert2";

const RootLayout = () => {

    const { pathname } = useLocation();
    const { updateSession } = useSession();
    const { errorMessage } = useAuth();

    useEffect(() => {
        if (updateSession) {
            updateSession();
        }
    }, [pathname, updateSession]);

    useEffect(() => {
        if ( errorMessage ) Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage,
            confirmButtonText: 'OK',
        });
    }, [errorMessage]);

    return (
        <>
            <div
                className="flex flex-col justify-between items-center 
                        gap-0 min-w-screen min-h-screen
                        bg-gradient-to-br from-gray-900 to-black"
                            >
                <Navbar />
                
                <div className="mx-auto w-full">
                    <Outlet />
                </div>
                <div className="flex-1"></div>
                <Footer />
            </div>
        </>
    );
}

export default RootLayout;