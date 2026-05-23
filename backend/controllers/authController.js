// ============================================
// Authentication Controller
// ============================================
// Handles user authentication logic:
// - User registration
// - User login
// - Token generation

import User from "../models/User.js";
import jwt from "jsonwebtoken";

/**
 * Generate JWT Token
 * @function generateToken
 * @description Creates a JWT token for authenticated users
 * @param {string} userId - The user's ID
 * @returns {string} JWT token valid for 7 days
 */
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token expires in 7 days
  });
};

/**
 * Register a new user
 * @async
 * @function register
 * @description Creates a new user account and returns a JWT token
 * @param {Object} req - Express request object
 * @param {string} req.body.firstName - User's first name
 * @param {string} req.body.lastName - User's last name
 * @param {string} req.body.email - User's email
 * @param {string} req.body.password - User's password
 * @param {string} req.body.role - User's role ('student' or 'teacher')
 * @param {Object} res - Express response object
 * @returns {Object} User data and JWT token
 */
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      role: role || "student",
    });

    // Save user to database
    await newUser.save();

    // Generate token
    const token = generateToken(newUser._id);

    // Return success response with user data (excluding password)
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message,
    });
  }
};

/**
 * Login user
 * @async
 * @function login
 * @description Authenticates user and returns a JWT token
 * @param {Object} req - Express request object
 * @param {string} req.body.email - User's email
 * @param {string} req.body.password - User's password
 * @param {Object} res - Express response object
 * @returns {Object} User data and JWT token
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find user by email and include password field (normally hidden)
    const user = await User.findOne({ email }).select("+password");

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare provided password with stored hashed password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Return success response with user data (excluding password)
    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};

/**
 * Get current user profile
 * @async
 * @function getProfile
 * @description Retrieves the current logged-in user's profile
 * @param {Object} req - Express request object (must have userId from auth middleware)
 * @param {Object} res - Express response object
 * @returns {Object} Current user's profile data
 */
export const getProfile = async (req, res) => {
  try {
    // userId is set by the verifyToken middleware
    const user = await User.findById(req.userId).populate("classrooms");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching profile",
      error: error.message,
    });
  }
};

/**
 * Update user profile
 * @async
 * @function updateProfile
 * @description Updates the current user's profile information
 * @param {Object} req - Express request object
 * @param {Object} req.body - Fields to update (firstName, lastName, phone, location, bio)
 * @param {Object} res - Express response object
 * @returns {Object} Updated user data
 */
export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone, location, bio } = req.body;

    // Find and update user
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        firstName,
        lastName,
        phone,
        location,
        bio,
      },
      { new: true, runValidators: true } // Return updated user and validate data
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error updating profile",
      error: error.message,
    });
  }
};
