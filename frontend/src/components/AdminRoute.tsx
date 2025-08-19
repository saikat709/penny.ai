import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { currentUser, isAuthenticated } = useAuth();

  if ( !isAuthenticated ) {
    return <Navigate to="/login" replace />;
  }

//   const user = currentUser as User | null;
//   if (!user || user.role !== "admin") {
//     return <Navigate to="/" replace />;
//   }

  return <>{children}</>;
};

export default AdminRoute;
