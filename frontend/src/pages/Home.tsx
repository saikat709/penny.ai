import React, { useEffect, useRef } from "react";
import LoadingComp from "../components/LoadingComp";
import axios from "axios";



const Home = () => {
    const [ isLoading, setIsLoading ] = React.useState(true);
    const eventSource = useRef<EventSource | null>(null);

    // useEffect(() => {
    //     const SSE_URL = "http://127.0.0.1:9090/api/chat/stream?prompt=hello+man+tell+me+a+story";
    //     eventSource.current = new EventSource(SSE_URL);

    //     eventSource.current.addEventListener("postback", event => {
    //         console.log("Received SSE:", event.data);
    //         console.log(event.data);
    //     });

    //     eventSource.current.onerror = error => {
    //         console.error("SSE error:", error);
    //     };

    //     return () => {
    //         eventSource.current?.close();
    //         console.log("SSE connection closed");
    //     };
    // }, []);



    useEffect(()=>{
        const res = axios.post("http://127.0.0.1:9090/api/auth/refresh?token=ewofm23oefji2wij");
        res.then((response) => {
            console.log("Response from stream-test:", response.data);
            setIsLoading(false);
        }).catch((error) => {
            console.error("Error fetching stream-test:", error);
            setIsLoading(false);
        });
    }, []);


    if ( isLoading ) return <LoadingComp />;
    return (
        <div className="flex-1 w-[100%] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-between items-top px-4 py-3 mx-auto">
            </div>
        </div>
    );
}

export default Home;