import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NotAuthenticatedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

//   if ( isAuthenticated) {
//     return <Navigate to="/profile" replace />;
//   }

  return <>{children}</>;
};

export default NotAuthenticatedRoute;
