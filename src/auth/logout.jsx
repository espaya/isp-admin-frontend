import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // make sure js-cookie is installed

const useLogout = () => {
  const { setUser, fetchUser } = useContext(AuthContext);
  const apiBase = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // 1. Get CSRF cookie (required for Sanctum)
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      // Optional: manually get token if needed
      const csrfToken = Cookies.get("XSRF-TOKEN");

      // 2. Call Laravel logout
      const res = await fetch(`${apiBase}/api/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": csrfToken ? decodeURIComponent(csrfToken) : "",
        },
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      // 3. Refresh user context
      await fetchUser();

      // 4. Navigate to login page
      navigate("/", { replace: true });

      // 5. Clear local user state
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return logout;
};

export default useLogout;
