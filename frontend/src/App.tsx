import { RouterProvider } from "react-router-dom";


import { WebSocketProvider } from "./contexts/WebSocketContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import router from "./router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SessionProvider } from "./contexts/SessionContext";


const apiUrl = import.meta.env.VITE_SOCKET_URL;

function App() {

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <SessionProvider>
        <ThemeProvider>
          <AuthContextProvider>
            <WebSocketProvider url={apiUrl}>
              <RouterProvider router={router} /> 
            </WebSocketProvider>
          </AuthContextProvider>
        </ThemeProvider>
      </SessionProvider>
    </GoogleOAuthProvider>
  );
}

export default App
