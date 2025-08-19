import { createBrowserRouter } from "react-router-dom";
import About      from "./pages/About";
import RootLayout     from "./RootLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminRoute from "./components/AdminRoute";
import AdminUsers from "./pages/admin/Users";
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
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import NotAuthenticatedRoute from "./components/NotAuthenticatedRoute";


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
        element: <NotAuthenticatedRoute> 
            <LoginqPage /> 
          </NotAuthenticatedRoute>,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: 'profile',
        element: (
          <AuthenticatedRoute> 
            <ProfileDashboard />
          </AuthenticatedRoute> 
          ),
      },
      {
        path: 'dashboard',
        element: <AuthenticatedRoute><Dashboard /></AuthenticatedRoute> ,
      },
      {
        path: 'admin',
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: 'admin/users',
        element: (
          <AdminRoute>
            <AdminUsers />
          </AdminRoute>
        ),
      },
      {
        path: "register",
        element: <NotAuthenticatedRoute>
            <RegisterPage />
          </NotAuthenticatedRoute> ,
      },
      {
        path: "forgot-password",
        element: <NotAuthenticatedRoute>
            <ForgotPasswordPage /> 
           </NotAuthenticatedRoute> ,
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