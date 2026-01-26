import { Outlet, NavLink, useLocation } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/Footer";

export default function AdminLayout() {
  const location = useLocation();

  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: "fas fa-tachometer-alt" },
    { path: "/admin/users", label: "Users", icon: "fas fa-users" },
    { path: "/admin/packages", label: "Packages", icon: "fas fa-box-open" },
    { path: "/admin/payments", label: "Payments", icon: "fas fa-credit-card" },
    { path: "/admin/settings", label: "Settings", icon: "fas fa-cog" },
    { path: "/logout", label: "Logout", icon: "fas fa-sign-out-alt text-danger" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
        <div className="p-4 text-center border-b border-gray-700">
          <img
            src="/images/admin-avatar.png"
            alt="Admin"
            className="w-20 h-20 mx-auto rounded-full mb-2"
          />
          <h4 className="font-semibold">Admin Name</h4>
          <span className="text-gray-400 text-sm">admin@isp.com</span>
        </div>

        <ul className="mt-4">
          {menuItems.map((item) => (
            <li key={item.path} className={location.pathname === item.path ? "bg-gray-900" : ""}>
              <NavLink
                to={item.path}
                className="flex items-center px-4 py-3 hover:bg-gray-700"
              >
                <i className={`${item.icon} w-5`} />
                <span className="ml-3">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-100 p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
