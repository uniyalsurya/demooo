import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      // No token, redirect to login
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const token = localStorage.getItem("accessToken");

  if (!token) {
    return null; // Don't render anything while redirecting
  }

  return children;
};

export default ProtectedRoute;
