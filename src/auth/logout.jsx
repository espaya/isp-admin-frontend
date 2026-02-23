import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // make sure js-cookie is installed

const useLogout = () => {
  const { setUser, fetchUser } = useContext(AuthContext);
  const apiBase = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = async () => {
    try {
      // 2. Call Laravel logout
      const res = await fetch(`${apiBase}/api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
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
