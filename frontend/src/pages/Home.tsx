import { useState } from "react";

const Home = () => {
    const [prompt, setPrompt] = useState("");
    

    return (
        <div className="flex-1 w-[100%] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-between items-top px-4 py-3 mx-auto">
                <div className="h-[20000px]">
                    <input
                        type="text"
                        value={prompt}
                        onChange={e => setPrompt(e.target.value)}
                        placeholder="Enter your prompt"
                        className="w-full p-2 border rounded"
                    />
    
                </div>
            </div>
        </div>
    );
}

export default Home;


