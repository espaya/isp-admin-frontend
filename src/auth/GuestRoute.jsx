import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function GuestRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Spinner />; // Wait until user is fetched

  if (user) return <Navigate to="/dashboard" replace />;

  return children;
}
