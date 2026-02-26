import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { setUser } = useContext(AuthContext);
  const apiBase = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await fetch(`${apiBase}/api/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
      }

      // 🔥 Remove token
      localStorage.removeItem("token");

      // 🔥 Clear user context
      setUser(null);

      // 🔥 Redirect
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed", err);

      // Even if API fails, clear client
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login", { replace: true });
    }
  };

  return logout;
};

export default useLogout;
