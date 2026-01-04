import CommonRoute from "../ProtectRoute/CommonRoute";
import React from "react";
import {
  BrowserRouter,
  Link,
  Outlet,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import MainLayout from "../layout/Mainlayout";
import { protectedRoutes } from "../ProtectRoute/CommonRoute";
import publicRoutes from "../ProtectRoute/CommonRoute";
import ProtectedRoute from "../ProtectRoute/ProtectedRoute";
const RoutingCom = () => {
  // const isAuthenticate = !!localStorage.getItem('token'); // Replace with actual authentication
  // const isLoggedIn = localStorage.getItem('token');/* your authentication check */

  const isLoggedIn = !!localStorage.getItem("token"); // Example: Checking login status
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          {Object.values(publicRoutes).map(
            ({ path, index, component: Component }) => (
              <Route
                key={path || "home"}
                index={index}
                path={path}
                element={<Component />}
              />
            ),
          )}

          {/* Protected Routes */}
          <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
            {Object.values(protectedRoutes).map(
              ({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ),
            )}
          </Route>
        </Route>

        {/* 404 Catch-all Route */}
        <Route path="*" element={<h1>Not Found Data</h1>} />
      </Routes>
    </>
  );
};

export default RoutingCom;
