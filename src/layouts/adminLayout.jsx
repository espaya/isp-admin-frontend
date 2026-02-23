import { Outlet, NavLink, useLocation } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/Footer";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import useLogout from "../auth/logout";
import Avatar from "../components/Avatar";

export default function AdminLayout() {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const logout = useLogout();

  const menuItems = [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: "fas fa-tachometer-alt",
    },
    { path: "/admin/dashboard/users", label: "Users", icon: "fas fa-users" },
    {
      path: "/admin/dashboard/packages",
      label: "Packages",
      icon: "fas fa-box-open",
    },
    {
      path: "/admin/dashboard/payments",
      label: "Payments",
      icon: "fas fa-credit-card",
    },
    {
      path: "/admin/dashboard/devices",
      label: "Devices",
      icon: "fas fa-laptop",
    },
    {
      path: "/admin/dashboard/settings",
      label: "Settings",
      icon: "fas fa-cog",
    },
  ];

  return (
    <div className="page-wrapper">
      {/* Page Title */}
      <section
        className="page-title_two"
        style={{ backgroundImage: "url(/images/background/page-title-2.jpg)" }}
      >
        <div
          className="page-title_two-gradient"
          style={{ backgroundImage: "url(/images/background/pattern-6.png)" }}
        />
        <div className="auto-container">
          <h2>Admin Dashboard</h2>
          <ul className="bread-crumb clearfix">
            <li>Home</li>
            <li>Dashboard</li>
          </ul>
        </div>
      </section>

      {/* MAIN AREA */}
      <section className="checkout-section">
        <div className="auto-container">
          <div className="row clearfix">
            {/* SIDEBAR */}
            <div className="col-lg-3 col-md-12 mb-4">
              <div className="card shadow-sm rounded-4 p-3 h-100">
                {/* PROFILE */}
                <div className="text-center mb-4">
                  <Avatar />
                  <h5 className="fw-bold mt-2">{user?.name || "Guest"}</h5>
                  <small className="text-muted d-block mb-2">
                    {user?.email || "N/A"}
                  </small>
                </div>

                {/* MENU */}
                <ul className="list-group list-group-flush">
                  {menuItems.map((item) => (
                    <li key={item.path} className="border-0 rounded-3 mb-1 p-0">
                      <NavLink
                        to={item.path}
                        end={item.path === "/admin/dashboard"} // 👈 add this
                        className={({ isActive }) =>
                          `list-group-item border-0 rounded-3 mb-1 d-flex align-items-center text-decoration-none ${
                            isActive ? "text-white" : "text-dark"
                          }`
                        }
                        style={({ isActive }) => ({
                          background: isActive
                            ? "linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)"
                            : "transparent",
                        })}
                      >
                        <i className={`${item.icon} me-2`}></i>
                        {item.label}
                      </NavLink>
                    </li>
                  ))}

                  {/* LOGOUT */}
                  <li className="list-group-item border-0 mt-3">
                    <button
                      className="d-flex align-items-center btn btn-outline-danger w-100 justify-content-start rounded-3"
                      onClick={logout}
                    >
                      <i className="fas fa-sign-out-alt me-2"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* DYNAMIC CONTENT */}
            <div className="col-lg-9 col-md-12">
              <Outlet />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
