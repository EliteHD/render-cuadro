import { useQuery } from "react-query";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import Loader from "@components/General/Loader";
import { useLocation } from "react-router-dom";

export default function PrivateRouter({ Component }) {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const currentURL = location.pathname;
  const allowedRoutes = ["/", "/Register", "/register"];

  if (!currentUser) {
    // If user is not authenticated
    if (allowedRoutes.includes(currentURL)) {
      return <Component />;
    } else {
      return <Navigate to="/" />;
    }
  } else {
    // If user is authenticated
    if (allowedRoutes.includes(currentURL)) {
      // Redirect authenticated user from Login page to Dashboard
      return <Navigate to="/Dashboard/users" />;
    } else if (currentURL === "/Login") {
      // Redirect authenticated user from Login page to Dashboard
      return <Navigate to="/Dashboard/users" />;
    }
    return <Component />;
  }
}
