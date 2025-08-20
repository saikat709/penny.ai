import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import useSession from "./hooks/useSession";
import useAuth from "./hooks/useAuth";
import Swal from "sweetalert2";
import LoadingComp from "./components/LoadingComp";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";

const RootLayout = () => {

    const { pathname } = useLocation();
    const { updateSession } = useSession();
    const { errorMessage, isLoading } = useAuth();

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

    if ( isLoading ) {
        return <LoadingComp />
    }   

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

                { pathname !== "/chat" 
                    && <Link to={"/chat"} 
                        className="fixed bottom-5 md:bottom-13 right-5 md:right-13 z-50 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors hover:scale-105 transition-transform duration-200"
                        >
                        <ChatBubbleBottomCenterIcon className="h-6 w-6 inline-block mr-2" />
                        Chat with Penny.AI
                </Link>
                }

            </div>
        </>
    );
}

export default RootLayout;