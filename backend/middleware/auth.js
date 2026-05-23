// ============================================
// Authentication Middleware
// ============================================
// Middleware to verify JWT tokens and protect routes
// Ensures only authenticated users can access certain endpoints

import jwt from "jsonwebtoken";

/**
 * Verify JWT Token Middleware
 * @middleware
 * @function verifyToken
 * @description Checks if the request has a valid JWT token in the Authorization header
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 *
 * @example
 * // Usage in routes:
 * router.get('/protected', verifyToken, controllerFunction);
 */
export const verifyToken = (req, res, next) => {
  // Get token from Authorization header
  // Expected format: "Bearer <token>"
  const token = req.headers.authorization?.split(" ")[1];

  // If no token is provided
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided. Please log in.",
    });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to request object for use in controllers
    req.userId = decoded.userId;

    // Call next middleware/route handler
    next();
  } catch (error) {
    // Token is invalid or expired
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please log in again.",
    });
  }
};

export default verifyToken;
