// ============================================
// Main Server File
// ============================================
// Entry point for the Express backend server
// Sets up all middleware, routes, and database connection

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import classroomRoutes from "./routes/classroomRoutes.js";

// Load environment variables from .env file
dotenv.config();

// Create Express app instance
const app = express();

// ============================================
// Middleware Setup
// ============================================

// CORS middleware - allows frontend to communicate with backend
// This is required since frontend runs on localhost:5173 and backend on localhost:5000
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true,
  })
);

// JSON parser middleware - parses incoming JSON request bodies
app.use(express.json());

// URL encoded parser middleware - parses form data
app.use(express.urlencoded({ extended: true }));

// ============================================
// Database Connection
// ============================================
// Connect to MongoDB before starting server
connectDB();

// ============================================
// API Routes
// ============================================

/**
 * Authentication Routes
 * Base URL: /api/auth
 * Routes: /register, /login, /profile, /profile (PUT)
 */
app.use("/api/auth", authRoutes);

/**
 * Classroom Routes
 * Base URL: /api/classrooms
 * Routes: POST /, GET /, GET /:id, POST /join, GET /:id/members, POST /:id/announcement
 */
app.use("/api/classrooms", classroomRoutes);

// ============================================
// Health Check Route
// ============================================
/**
 * Test route to verify server is running
 * @route GET /api/health
 * @access Public
 */
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "✅ Backend server is running!",
  });
});

// ============================================
// 404 Not Found Handler
// ============================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ============================================
// Error Handling Middleware
// ============================================
/**
 * Global error handler
 * Catches any errors that occur in route handlers
 */
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server error",
  });
});

// ============================================
// Start Server
// ============================================

// Get port from environment or use default
const PORT = process.env.PORT || 5000;

// Start listening on specified port
app.listen(PORT, () => {
  console.log(`
  ╔═════════════════════════════════════════╗
  ║  🎓 Google Classroom Backend Started    ║
  ║  📍 Server running on: http://localhost:${PORT}
  ║  🗄️  Database: MongoDB Connected         ║
  ║  ✅ Ready to accept requests            ║
  ╚═════════════════════════════════════════╝
  `);
});

export default app;
