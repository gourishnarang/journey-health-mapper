import { Navigate, useLocation } from "react-router-dom";
import useEarlyAccessAuth from "@/hooks/useEarlyAccessAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useEarlyAccessAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/early-access-login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;