import { createBrowserRouter } from "react-router-dom";
import Login from "./views/login";
import GuestRoute from "./auth/GuestRoute";
import AdminLayout from "./layouts/adminLayout";
import AdminHome from "./views/admin/adminHome";
import UsersPage from "./views/admin/users";
import ProtectedRoute from "./auth/ProtectedRoute";
import NotFound from "./views/NotFound";
import Packages from "./views/admin/packages";
import Payment from "./views/admin/Payment";
import Devices from "./views/admin/devices";
import Settings from "./views/admin/Settings";
import AddDevice from "./views/admin/AddDevice";
import SingleDevice from "./views/admin/SingleDevice";

export const ROUTE_CONFIG = {
  LANDING: {
    path: "/",
    name: "Landing Page",
    isProtected: false,
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },

  //   SUBSCRIBE: {
  //     path: "/subscribe/:packageId",
  //     name: "Subscribe Page",
  //     isProtected: false,
  //     element: <Login />,
  //   },

  // User dashboard routes
  DASHBOARD: {
    path: "/admin/dashboard",
    name: "Admin Page",
    isProtected: true, // use this flag
    element: <AdminLayout />, // NO ProtectedRoute here
    children: [
      { index: true, element: <AdminHome /> },
      { path: "users", element: <UsersPage /> },
      { path: "packages", element: <Packages /> },
      { path: "payments", element: <Payment /> },
      { path: "devices", element: <Devices /> },
      { path: "devices/add", element: <AddDevice /> },
       { path: "devices/device_name", element: <SingleDevice /> },
      { path: "settings", element: <Settings /> },
    ],
  },
};

// Helper functions for route access
export const getRoutePath = (routeName) => {
  const route = Object.values(ROUTE_CONFIG).find((r) => r.name === routeName);
  return route ? route.path : "/";
};

export const getRouteElement = (routeName) => {
  const route = Object.values(ROUTE_CONFIG).find((r) => r.name === routeName);
  return route ? route.element : <NotFound />;
};

// Create the router
const router = createBrowserRouter(
  Object.values(ROUTE_CONFIG).map(
    ({ path, element, children, isProtected, isGuestOnly, roles = [] }) => ({
      path,
      element: isProtected ? (
        <ProtectedRoute roles={roles}>{element}</ProtectedRoute>
      ) : isGuestOnly ? (
        <GuestRoute>{element}</GuestRoute>
      ) : (
        element
      ),
      children, // ✅ THIS WAS MISSING
    }),
  ),
);

export default router;

// Path constants for direct usage
export const PATHS = Object.fromEntries(
  Object.entries(ROUTE_CONFIG).map(([key, value]) => [key, value.path]),
);
