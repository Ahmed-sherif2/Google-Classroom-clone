// ============================================
// Classroom Routes
// ============================================
// Routes for classroom operations:
// - POST /classrooms - Create classroom
// - GET /classrooms - Get all classrooms for user
// - GET /classrooms/:id - Get single classroom
// - POST /classrooms/join - Join classroom with code
// - GET /classrooms/:id/members - Get classroom members
// - POST /classrooms/:id/announcement - Post announcement

import express from "express";
import {
  createClassroom,
  getClassrooms,
  getClassroom,
  joinClassroom,
  getClassroomMembers,
  postAnnouncement,
} from "../controllers/classroomController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * @route POST /classrooms
 * @description Create a new classroom (teacher only)
 * @access Private (requires authentication)
 * @header {string} Authorization - Bearer token
 * @body {string} name - Classroom name
 * @body {string} section - Section/period
 * @body {string} description - Classroom description
 * @body {string} color - Card color (hex code, optional)
 * @body {string} icon - Emoji icon (optional)
 * @returns {Object} Created classroom data
 */
router.post("/", verifyToken, createClassroom);

/**
 * @route GET /classrooms
 * @description Get all classrooms for current user (as teacher or student)
 * @access Private (requires authentication)
 * @header {string} Authorization - Bearer token
 * @returns {Array} Array of classroom objects
 */
router.get("/", verifyToken, getClassrooms);

/**
 * @route GET /classrooms/:id
 * @description Get single classroom by ID
 * @access Private (requires authentication)
 * @header {string} Authorization - Bearer token
 * @param {string} id - Classroom ID
 * @returns {Object} Classroom data with teacher and students
 */
router.get("/:id", verifyToken, getClassroom);

/**
 * @route POST /classrooms/join
 * @description Join a classroom using class code
 * @access Private (requires authentication)
 * @header {string} Authorization - Bearer token
 * @body {string} classCode - The classroom code
 * @returns {Object} Updated classroom data
 */
router.post("/join", verifyToken, joinClassroom);

/**
 * @route GET /classrooms/:id/members
 * @description Get all members of a classroom
 * @access Private (requires authentication)
 * @header {string} Authorization - Bearer token
 * @param {string} id - Classroom ID
 * @returns {Array} Array of members with their details
 */
router.get("/:id/members", verifyToken, getClassroomMembers);

/**
 * @route POST /classrooms/:id/announcement
 * @description Post a new announcement in classroom
 * @access Private (requires authentication)
 * @header {string} Authorization - Bearer token
 * @param {string} id - Classroom ID
 * @body {string} title - Announcement title
 * @body {string} body - Announcement content
 * @returns {Object} Updated classroom with new announcement
 */
router.post("/:id/announcement", verifyToken, postAnnouncement);

export default router;
