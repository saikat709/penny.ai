import { createBrowserRouter } from "react-router-dom";
import About      from "./pages/About";
import RootLayout     from "./RootLayout";
import Page404    from "./pages/Page404";
import LoginqPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatScreen from "./pages/ChatScreen";
import LandingPage from "./pages/LandingPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        index: true,
        path: "home",
        element: <LandingPage />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "chat",
        element: <ChatScreen />,
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

export default router;