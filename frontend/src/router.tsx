import { createBrowserRouter } from "react-router-dom";
import About      from "./pages/About";
import RootLayout     from "./RootLayout";
import Page404    from "./pages/Page404";
import LoginqPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatScreen from "./pages/ChatScreen";
import History from "./pages/History";
import Customize from "./pages/Customize";
import LandingPage from "./pages/LandingPage";
import ProfileDashboard from "./pages/ProfileDashboard";
import Dashboard from "./pages/Dashboard";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SignupPage from "./pages/SignupPage";


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
        path: "customize",
        element: <Customize />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "login",
        element: <LoginqPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: 'profile',
        element: <ProfileDashboard />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
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