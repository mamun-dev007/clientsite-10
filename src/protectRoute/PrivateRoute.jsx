import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";   // ✅ Correct
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";            // ✅ Correct

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <Loading />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
