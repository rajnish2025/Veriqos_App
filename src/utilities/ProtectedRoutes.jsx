import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  let token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/docs" replace />;
  } else if (token != import.meta.env.VITE_TEM_TOKEN) {
    return <Navigate to="/docs" replace />;
  }
  return children;
};

export default ProtectedRoutes;
