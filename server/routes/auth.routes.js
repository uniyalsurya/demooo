const express = require("express");
const router = express.Router();

// 🚨 CRITICAL: Import verifyToken (was missing!)
const {
  register_orginization,
  register_user,
  login,
  logout,
  updateProfile,
  viewProfile,
  refreshToken,
  verifyToken, // ✅ Now importing verifyToken
} = require("../controllers/auth2.controller");

const authMiddleware = require("../middleware/Auth.middleware");
const role = require("../middleware/role.middleware");

// Organization register
router.post("/organization-register", register_orginization);

// New user register
router.post("/register-user", register_user);

// Token refresh
router.post("/refresh-token", refreshToken);

// 🆕 NEW: Token verification endpoint
router.post("/verify-token", verifyToken);

// Login
router.post("/login", login);

// Logout (protected route)
router.post("/logout", authMiddleware, logout);

// Update profile (protected route)
router.put(
  "/updateProfile",
  authMiddleware,
  role(["organization"]),
  updateProfile
);

// View profile (protected route)
router.get("/viewProfile", authMiddleware, viewProfile);

module.exports = router;
