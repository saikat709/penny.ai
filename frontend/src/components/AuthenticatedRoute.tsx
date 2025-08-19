import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingComp from "./LoadingComp";

const AuthenticatedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading, currentUser } = useAuth();

  if (isLoading) {
    return <LoadingComp />
  }

  if ( !isAuthenticated ) {
    console.log(isAuthenticated, isLoading, currentUser);
    console.log("User is not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthenticatedRoute;
