import React from "react";
import { Navigate } from "react-router-dom";
import { getToken, isTokenExpired, removeToken } from "../utils/token";

const ProtectedRoute = ({ children, role }) => {
  const token = getToken();

  if (!token || isTokenExpired()) {
    removeToken();
    return <Navigate to="/login" replace />;
  }

  const payload = JSON.parse(atob(token.split(".")[1]));
  const userRole = payload.role;

  if (role !== userRole) {
    return <Navigate to="/login" replace />;
  }

  // Pass role to child layout
  return React.cloneElement(children, { role: userRole });
};

export default ProtectedRoute;
