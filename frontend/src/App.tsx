import { RouterProvider } from "react-router-dom";


import { WebSocketProvider } from "./contexts/WebSocketContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
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
