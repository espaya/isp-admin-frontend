import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function ProtectedRoute({ children, roles = [] }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <Spinner />;

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
