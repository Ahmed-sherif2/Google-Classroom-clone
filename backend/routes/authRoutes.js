// ============================================
// Authentication Routes
// ============================================
// Routes for user authentication:
// - POST /auth/register - Register new user
// - POST /auth/login - Login user
// - GET /auth/profile - Get current user profile
// - PUT /auth/profile - Update user profile

import express from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * @route POST /auth/register
 * @description Register a new user
 * @access Public
 * @body {string} firstName - First name
 * @body {string} lastName - Last name
 * @body {string} email - Email address
 * @body {string} password - Password
 * @body {string} role - User role ('student' or 'teacher')
 * @returns {Object} User data and JWT token
 */
router.post("/register", register);

/**
 * @route POST /auth/login
 * @description Login user
 * @access Public
 * @body {string} email - Email address
 * @body {string} password - Password
 * @returns {Object} User data and JWT token
 */
router.post("/login", login);

/**
 * @route GET /auth/profile
 * @description Get current user's profile
 * @access Private (requires authentication)
 * @header {string} Authorization - Bearer token
 * @returns {Object} User profile data
 */
router.get("/profile", verifyToken, getProfile);

/**
 * @route PUT /auth/profile
 * @description Update current user's profile
 * @access Private (requires authentication)
 * @header {string} Authorization - Bearer token
 * @body {string} firstName - First name (optional)
 * @body {string} lastName - Last name (optional)
 * @body {string} phone - Phone number (optional)
 * @body {string} location - Location (optional)
 * @body {string} bio - Bio (optional)
 * @returns {Object} Updated user data
 */
router.put("/profile", verifyToken, updateProfile);

export default router;
