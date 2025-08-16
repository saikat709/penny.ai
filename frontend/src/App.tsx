import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home       from "./pages/Home";
import About      from "./pages/About";
import RootLayout     from "./RootLayout";
import Page404    from "./pages/Page404";

import { WebSocketProvider } from "./hooks/WebSocketContext";
import { AuthContextProvider } from "./hooks/AuthContext";
import LoginqPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        index: true,
        path: "home",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "auth",
        children: [
          {
            path: "login",
            element: <LoginqPage />,
          },
         {
            path: "register",
            element: <RegisterPage />,
          },
        ]
      },
      {
        path: "*",
        element: <Page404 />,
      },
      {
        path: "*/*",
        element: <Page404 />,
      }
    ]
  },
]);

const apiUrl = import.meta.env.VITE_SOCKET_URL

function App() {
  return (
    <AuthContextProvider>
      <WebSocketProvider url={apiUrl}>
        <RouterProvider router={router} /> 
      </WebSocketProvider>
    </AuthContextProvider>
  );
}

export default App
