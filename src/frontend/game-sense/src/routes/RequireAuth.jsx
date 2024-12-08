import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

export const RequireAuth = ({ children }) => {
  const token = Cookies.get("_auth", null);

  console.log("JWT token:", token); 

  if (!token) {
    toast.error("You must be logged in to access this page.")
    return <Navigate to="/" />;
  }
  return children;
};
