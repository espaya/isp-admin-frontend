import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function ProtectedRoute({ children, roles = [] }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Spinner/>

  if (!user) return <Navigate to="/login" replace />;

  if (roles.length && !roles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
}
