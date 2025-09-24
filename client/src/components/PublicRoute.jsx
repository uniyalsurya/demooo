import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      // Token exists, redirect to teacherinfo
      navigate("/teacherinfo", { replace: true });
    }
  }, [navigate]);

  const token = localStorage.getItem("accessToken");

  if (token) {
    return null; // Don't render anything while redirecting
  }

  return children;
};

export default PublicRoute;
