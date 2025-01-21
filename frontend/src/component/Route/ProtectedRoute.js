import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const [delayed, setDelayed] = useState(true);

  useEffect(() => {
    const randomDelay = Math.floor(Math.random() * 100); 
    const timer = setTimeout(() => setDelayed(false), randomDelay);
    return () => clearTimeout(timer); 
  }, []);

  if (loading || delayed) {
    return <Loader />;
  }

  // Check if user is null or undefined before accessing role
  if (isAdmin && user && user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return isAuthenticated ? (
    Component ? <Component {...rest} /> : <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
