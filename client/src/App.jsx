import "./App.css";
import TeacherInfo from "./components/user_side/TeacherInfo";
import { motion, AnimatePresence } from "framer-motion";
import AnimationPage from "./components/user_side/AnimationPage";
import React, { useEffect, useRef, useState } from "react";
import NewQrcode from "./components/user_side/Newqrcode";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Logout from "./components/user_side/LogoutPage";
import Dashboad from "./components/user_side/Dashboad";
import { LoginPage } from "./components/user_side/LoginPage";
import OrganizationRegister from "./components/user_side/OrganizationRegister";

import AdminHome from "./components/Admin_side/AdminHome";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { useAuth } from "./context/AuthContext";
import { useAdminProtection } from "./hooks/useAdminProtection";
import "cally";
import AdminProtected from "./components/AdminProtected";
import ClickSpark from "./reactbitscomponents/ClickSpark";
import ResetPass from "./components/Admin_side/ResetPass";

function App() {
  const location = useLocation();

  return (
    <>
      <ClickSpark
        sparkColor="#000000"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Routes - Redirect to teacherinfo if already logged in */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LoginPage />
                  </motion.div>
                </PublicRoute>
              }
            />

            <Route
              path="/register-organization"
              element={
                <PublicRoute>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <OrganizationRegister />
                  </motion.div>
                </PublicRoute>
              }
            />

           

            {/* Protected Routes - Require authentication */}
            <Route
              path="/teacherinfo"
              element={
                <ProtectedRoute>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TeacherInfo />
                  </motion.div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/animation"
              element={
                <ProtectedRoute>
                  <AnimationPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/scanqr"
              element={
                <ProtectedRoute>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <NewQrcode />
                  </motion.div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Dashboad />
                  </motion.div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/showlogout"
              element={
                <ProtectedRoute>
                  <Logout />
                </ProtectedRoute>
              }
            />
             <Route
              path="/ResetPass"
              element={
                <ProtectedRoute>
                  <ResetPass />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminProtected>
                    <AdminHome />
                  </AdminProtected>
                </ProtectedRoute>
              }
            />

           

            {/* Root route - redirect based on authentication */}
            <Route
              path="/"
              element={
                localStorage.getItem("accessToken") ? (
                  <Navigate to="/teacherinfo" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Catch all - redirect to appropriate page */}
            <Route
              path="*"
              element={
                localStorage.getItem("accessToken") ? (
                  <Navigate to="/teacherinfo" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </AnimatePresence>
      </ClickSpark>
                        {/* <Navigate to="/login" replace /> */}

    </>
  );
}

export default App;
