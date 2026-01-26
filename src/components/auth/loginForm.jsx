import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const apiBase = import.meta.env.VITE_API_URL;
  const { fetchUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});

    try {
      // Get CSRF cookie
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        method: "GET",
        credentials: "include",
      });

      const getXsrfToken = () => {
        const match = document.cookie
          .split("; ")
          .find((row) => row.startsWith("XSRF-TOKEN="));

        return match ? decodeURIComponent(match.split("=")[1]) : "";
      };

      // Login request
      const response = await fetch(`${apiBase}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": getXsrfToken(),
        },
        credentials: "include", // ✅ Important for Sanctum
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.errors || { general: data.message || "Login failed" });
        return;
      }

      await fetchUser(); // Refresh user data after login

      // Redirect on success
      navigate(data.redirect_url || "/", { replace: true });
    } catch (err) {
      setError({ general: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error.general && (
        <p className="alert alert-danger text-center">{error.general}</p>
      )}

      <div className="form-column col-lg-6 col-md-12 col-sm-12 mx-auto">
        <h3>Login</h3>

        <div className="inner-column">
          <div className="default-form style-two">
            <form method="post" onSubmit={submitLogin}>
              <div className="form-group">
                <label>Username or Email Address*</label>
                <input
                  value={formData.email}
                  type="text"
                  name="email"
                  autoComplete="off"
                  onChange={handleChange}
                />
                {error.email && (
                  <small className="text-danger">{error.email[0]}</small>
                )}
              </div>

              <div className="form-group position-relative">
                <label>Password*</label>
                <input
                  value={formData.password}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="off"
                  onChange={handleChange}
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "38px",
                    cursor: "pointer",
                  }}
                >
                  <i
                    className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  ></i>
                </span>
                {error.password && (
                  <small className="text-danger">{error.password[0]}</small>
                )}
              </div>

              <div className="form-group">
                <div className="check-box">
                  <input
                    type="checkbox"
                    name="remember" // ✅ matches state
                    id="type-1"
                    checked={formData.remember}
                    onChange={handleChange}
                  />
                  <label htmlFor="type-1">Remember me</label>
                </div>
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="theme-btn btn-style-four w-100"
                  disabled={loading}
                >
                  <span className="btn-wrap">
                    <span className="text-one">
                      {loading ? "Logging in..." : "Log in"}
                      <i className="fas fa-arrow-right fa-fw" />
                    </span>
                    <span className="text-two">
                      {loading ? "Logging in..." : "Log in"}
                      <i className="fas fa-arrow-right fa-fw" />
                    </span>
                  </span>
                </button>
              </div>

              <div className="form-group text-center">
                <a href="#" className="forgot">
                  Lost your password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
