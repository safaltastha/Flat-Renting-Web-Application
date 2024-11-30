// src/components/ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useUser();
  console.log(user, 'user form protected route')

  if (!user) {
    // If user is not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // If user role is not allowed, redirect to Unauthorized
    return <Navigate to="/unauthorized" replace />;
  }

  // If user is allowed, render the children
  return children || <Outlet />;
};

export default ProtectedRoute;
