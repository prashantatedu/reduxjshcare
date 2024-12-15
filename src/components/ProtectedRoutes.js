import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { user, role } = useSelector((state) => state.auth);
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoutes;
