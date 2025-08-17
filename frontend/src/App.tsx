import { RouterProvider } from "react-router-dom";


import { WebSocketProvider } from "./hooks/WebSocketContext";
import { AuthContextProvider } from "./hooks/AuthContext";
import { ThemeProvider } from "./hooks/ThemeContext";
import router from "./router";


const apiUrl = import.meta.env.VITE_SOCKET_URL;

function App() {
  return (
    <ThemeProvider>
      <AuthContextProvider>
        <WebSocketProvider url={apiUrl}>
          <RouterProvider router={router} /> 
        </WebSocketProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App
