import React from "react";
import { useAdminProtection } from "../hooks/useAdminProtection";

const AdminProtected = ({ children }) => {
  const isAdmin = useAdminProtection();

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-bold text-red-600">
        🚫 Access Denied – Admins Only
      </div>
    );
  }

  return children;
};

export default AdminProtected;
