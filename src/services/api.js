// ============================================
// API Service
// ============================================
// Centralized API service for all frontend-backend communication
// Handles all HTTP requests to the backend
// Manages tokens and API endpoints

// Backend API base URL
const API_BASE_URL = "http://localhost:5000/api";

/**
 * Get stored JWT token from localStorage
 * @returns {string} JWT token or null
 */
const getToken = () => {
  return localStorage.getItem("token");
};

/**
 * Generic API request function
 * @async
 * @param {string} endpoint - API endpoint (e.g., '/auth/login')
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {Object} data - Request body data (optional)
 * @returns {Promise<Object>} API response
 */
const apiCall = async (endpoint, method = "GET", data = null) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Add JWT token to Authorization header if it exists
    const token = getToken();
    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }

    // Add request body if data is provided
    if (data) {
      options.body = JSON.stringify(data);
    }

    // Make the API request
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    // Parse response as JSON
    const responseData = await response.json();

    // Check if response is successful
    if (!response.ok) {
      throw new Error(responseData.message || "API request failed");
    }

    return responseData;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// ============================================
// Authentication API Calls
// ============================================

/**
 * Register new user
 * @async
 * @param {Object} userData - User registration data
 * @param {string} userData.firstName - First name
 * @param {string} userData.lastName - Last name
 * @param {string} userData.email - Email
 * @param {string} userData.password - Password
 * @param {string} userData.role - Role (student/teacher)
 * @returns {Promise<Object>} User data and token
 */
export const registerUser = async (userData) => {
  const response = await apiCall("/auth/register", "POST", userData);
  // Store token in localStorage
  if (response.token) {
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
  }
  return response;
};

/**
 * Login user
 * @async
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User data and token
 */
export const loginUser = async (email, password) => {
  const response = await apiCall("/auth/login", "POST", { email, password });
  // Store token and user in localStorage
  if (response.token) {
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
  }
  return response;
};

/**
 * Get current user profile
 * @async
 * @returns {Promise<Object>} User profile data
 */
export const getProfile = async () => {
  return await apiCall("/auth/profile", "GET");
};

/**
 * Update user profile
 * @async
 * @param {Object} profileData - Profile data to update
 * @returns {Promise<Object>} Updated profile data
 */
export const updateProfile = async (profileData) => {
  return await apiCall("/auth/profile", "PUT", profileData);
};

/**
 * Logout user (clear local storage)
 */
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// ============================================
// Classroom API Calls
// ============================================

/**
 * Create a new classroom
 * @async
 * @param {Object} classroomData - Classroom data
 * @param {string} classroomData.name - Classroom name
 * @param {string} classroomData.section - Section/period
 * @param {string} classroomData.description - Description
 * @param {string} classroomData.color - Color (hex)
 * @param {string} classroomData.icon - Icon emoji
 * @returns {Promise<Object>} Created classroom
 */
export const createClassroom = async (classroomData) => {
  return await apiCall("/classrooms", "POST", classroomData);
};

/**
 * Get all classrooms for current user
 * @async
 * @returns {Promise<Object>} Array of classrooms
 */
export const getClassrooms = async () => {
  return await apiCall("/classrooms", "GET");
};

/**
 * Get single classroom by ID
 * @async
 * @param {string} classroomId - Classroom ID
 * @returns {Promise<Object>} Classroom data
 */
export const getClassroom = async (classroomId) => {
  return await apiCall(`/classrooms/${classroomId}`, "GET");
};

/**
 * Join classroom with code
 * @async
 * @param {string} classCode - Classroom code
 * @returns {Promise<Object>} Updated classroom
 */
export const joinClassroom = async (classCode) => {
  return await apiCall("/classrooms/join", "POST", { classCode });
};

/**
 * Get classroom members
 * @async
 * @param {string} classroomId - Classroom ID
 * @returns {Promise<Object>} Array of members
 */
export const getClassroomMembers = async (classroomId) => {
  return await apiCall(`/classrooms/${classroomId}/members`, "GET");
};

/**
 * Post announcement to classroom
 * @async
 * @param {string} classroomId - Classroom ID
 * @param {Object} announcementData - Announcement data
 * @param {string} announcementData.title - Title
 * @param {string} announcementData.body - Content
 * @returns {Promise<Object>} Updated classroom with announcement
 */
export const postAnnouncement = async (classroomId, announcementData) => {
  return await apiCall(
    `/classrooms/${classroomId}/announcement`,
    "POST",
    announcementData
  );
};

// ============================================
// Health Check
// ============================================

/**
 * Check if backend server is running
 * @async
 * @returns {Promise<Object>} Health status
 */
export const checkHealth = async () => {
  try {
    return await apiCall("/health", "GET");
  } catch (error) {
    return { success: false, message: "Backend server is not running" };
  }
};
