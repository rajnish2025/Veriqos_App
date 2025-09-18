import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  let token = localStorage.getItem("token");
  console.log("temp token: ", typeof import.meta.env.VITE_TEM_TOKEN, token);
  if (!token || token != import.meta.env.VITE_TEM_TOKEN) {
    return <Navigate to="/docs" replace />;
  }
  return children;
};

export default ProtectedRoutes;
