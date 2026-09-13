import express from "express";
import passport from "passport";

import {
  signup,
  login,
  getCurrentUser,
  forgotPassword,
  refreshToken,
  googleLogin
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

// Google Login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false
  }),
  googleLogin
);

// Current user
router.get("/me", auth, getCurrentUser);

export default router;