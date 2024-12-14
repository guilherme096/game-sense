import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const token = Cookies.get("_auth", null);

  if (!token) {

    if (location.pathname == "/profile") {
      toast.error("You must be logged in to access this page.");
      return <Navigate to="/" state={{ from: "/home" }} replace />;

    }

    toast.error("You must be logged in to access this page.");
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};