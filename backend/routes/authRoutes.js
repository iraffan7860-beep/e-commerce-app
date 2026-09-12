import express from "express";

import {
  signup,
  login,
  getCurrentUser,
  forgotPassword,
  refreshToken
} from "../controllers/authController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

// Refresh Token
router.post("/refresh-token", refreshToken);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Current user
router.get("/me", auth, getCurrentUser);

export default router;