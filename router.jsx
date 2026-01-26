import { createBrowserRouter } from "react-router-dom";
// import GuestRoute from "./auth/GuestRoute";
// import Landing from "./views/landing";
// import Login from "./views/login";
// import DashboardLayout from "./layouts/DashboardLayout";
// import DashboardHome from "./views/dashboard/DashboardHome";
// import MyPackage from "./views/dashboard/MyPackage";
// import Payments from "./views/dashboard/Payments";
// import Support from "./views/dashboard/Support";
// import Account from "./views/dashboard/Account";
// import ProtectedRoute from "./auth/ProtectedRoute";

export const ROUTE_CONFIG = {
//   LANDING: {
//     path: "/",
//     name: "Landing Page",
//     isProtected: false,
//     element: <Landing />,
//   },

//   LOGIN: {
//     path: "/login",
//     name: "Login Page",
//     isProtected: false,
//     element: (
//       <GuestRoute>
//         <Login />
//       </GuestRoute>
//     ),
//   },

//   SUBSCRIBE: {
//     path: "/subscribe/:packageId",
//     name: "Subscribe Page",
//     isProtected: false,
//     element: <Login />,
//   },

  // User dashboard routes
//   DASHBOARD: {
//     path: "/dashboard",
//     name: "Dashboard Page",
//     isProtected: true, // use this flag
//     element: <DashboardLayout />, // NO ProtectedRoute here
//     children: [
//       { index: true, element: <DashboardHome /> },
//       { path: "package", element: <MyPackage /> },
//       { path: "payments", element: <Payments /> },
//       { path: "support", element: <Support /> },
//       { path: "account", element: <Account /> },
//     ],
//   },
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
