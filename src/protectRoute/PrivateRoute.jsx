import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import Loading from "../pages/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loading></Loading>
  if (!user) return <Navigate to="/login" />;

  return children;
};

export default PrivateRoute;
