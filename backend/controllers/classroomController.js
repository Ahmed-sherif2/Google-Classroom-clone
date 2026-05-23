// ============================================
// Classroom Controller
// ============================================
// Handles classroom-related operations:
// - Create classroom
// - Get classrooms
// - Join classroom
// - Get classroom members
// - Post announcements

import Classroom from "../models/Classroom.js";
import User from "../models/User.js";

/**
 * Create a new classroom
 * @async
 * @function createClassroom
 * @description Creates a new classroom (teacher only)
 * @param {Object} req - Express request object
 * @param {string} req.body.name - Classroom name
 * @param {string} req.body.section - Section/period
 * @param {string} req.body.description - Classroom description
 * @param {string} req.body.color - Card color (hex code)
 * @param {string} req.body.icon - Emoji icon
 * @param {Object} res - Express response object
 * @returns {Object} Created classroom data
 */
export const createClassroom = async (req, res) => {
  try {
    const { name, section, description, color, icon } = req.body;

    // Validate required fields
    if (!name || !section || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, section, and description",
      });
    }

    // Create new classroom with current user as teacher
    const classroom = new Classroom({
      name,
      section,
      description,
      color: color || "#667eea",
      icon: icon || "📚",
      teacher: req.userId, // Current user is the teacher
    });

    // Save classroom to database
    await classroom.save();

    // Populate teacher data before sending response
    await classroom.populate("teacher", "firstName lastName email");

    res.status(201).json({
      success: true,
      message: "Classroom created successfully",
      classroom,
    });
  } catch (error) {
    console.error("Create classroom error:", error);
    res.status(500).json({
      success: false,
      message: "Server error creating classroom",
      error: error.message,
    });
  }
};

/**
 * Get all classrooms for current user
 * @async
 * @function getClassrooms
 * @description Retrieves classrooms where user is teacher or enrolled as student
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Array} Array of classroom objects
 */
export const getClassrooms = async (req, res) => {
  try {
    // Find classrooms where user is teacher OR student
    const classrooms = await Classroom.find({
      $or: [
        { teacher: req.userId }, // User is teacher
        { students: req.userId }, // User is student
      ],
    })
      .populate("teacher", "firstName lastName email")
      .populate("students", "firstName lastName email");

    res.json({
      success: true,
      classrooms,
    });
  } catch (error) {
    console.error("Get classrooms error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching classrooms",
      error: error.message,
    });
  }
};

/**
 * Get single classroom by ID
 * @async
 * @function getClassroom
 * @description Retrieves a specific classroom with all details
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Classroom ID
 * @param {Object} res - Express response object
 * @returns {Object} Classroom data with teacher and students
 */
export const getClassroom = async (req, res) => {
  try {
    const { id } = req.params;

    // Find classroom and populate related data
    const classroom = await Classroom.findById(id)
      .populate("teacher", "firstName lastName email")
      .populate("students", "firstName lastName email");

    if (!classroom) {
      return res.status(404).json({
        success: false,
        message: "Classroom not found",
      });
    }

    res.json({
      success: true,
      classroom,
    });
  } catch (error) {
    console.error("Get classroom error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching classroom",
      error: error.message,
    });
  }
};

/**
 * Join classroom using class code
 * @async
 * @function joinClassroom
 * @description Adds current user as student to a classroom using class code
 * @param {Object} req - Express request object
 * @param {string} req.body.classCode - The classroom code
 * @param {Object} res - Express response object
 * @returns {Object} Updated classroom data
 */
export const joinClassroom = async (req, res) => {
  try {
    const { classCode } = req.body;

    if (!classCode) {
      return res.status(400).json({
        success: false,
        message: "Please provide class code",
      });
    }

    // Find classroom by code
    const classroom = await Classroom.findOne({ classCode });

    if (!classroom) {
      return res.status(404).json({
        success: false,
        message: "Classroom code not found",
      });
    }

    // Check if user is already enrolled
    if (classroom.students.includes(req.userId)) {
      return res.status(400).json({
        success: false,
        message: "Already enrolled in this classroom",
      });
    }

    // Add user to students array
    classroom.students.push(req.userId);
    await classroom.save();

    // Add classroom to user's classrooms
    await User.findByIdAndUpdate(req.userId, {
      $push: { classrooms: classroom._id },
    });

    await classroom.populate("teacher", "firstName lastName email");
    await classroom.populate("students", "firstName lastName email");

    res.json({
      success: true,
      message: "Successfully joined classroom",
      classroom,
    });
  } catch (error) {
    console.error("Join classroom error:", error);
    res.status(500).json({
      success: false,
      message: "Server error joining classroom",
      error: error.message,
    });
  }
};

/**
 * Get classroom members
 * @async
 * @function getClassroomMembers
 * @description Retrieves all members (teacher and students) of a classroom
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Classroom ID
 * @param {Object} res - Express response object
 * @returns {Object} Teacher and students array with full details
 */
export const getClassroomMembers = async (req, res) => {
  try {
    const { id } = req.params;

    const classroom = await Classroom.findById(id)
      .populate("teacher", "firstName lastName email avatar role")
      .populate("students", "firstName lastName email avatar role");

    if (!classroom) {
      return res.status(404).json({
        success: false,
        message: "Classroom not found",
      });
    }

    // Format response with teacher and students
    const members = [
      {
        ...classroom.teacher.toObject(),
        role: "teacher",
        joinDate: classroom.createdAt,
      },
      ...classroom.students.map((student) => ({
        ...student.toObject(),
        role: "student",
        joinDate: classroom.createdAt,
      })),
    ];

    res.json({
      success: true,
      members,
    });
  } catch (error) {
    console.error("Get classroom members error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching classroom members",
      error: error.message,
    });
  }
};

/**
 * Post announcement to classroom
 * @async
 * @function postAnnouncement
 * @description Creates a new announcement in a classroom
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Classroom ID
 * @param {string} req.body.title - Announcement title
 * @param {string} req.body.body - Announcement body/content
 * @param {Object} res - Express response object
 * @returns {Object} Updated classroom with new announcement
 */
export const postAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({
        success: false,
        message: "Please provide title and body",
      });
    }

    // Find classroom
    const classroom = await Classroom.findById(id);

    if (!classroom) {
      return res.status(404).json({
        success: false,
        message: "Classroom not found",
      });
    }

    // Create announcement object
    const announcement = {
      id: new Date(),
      title,
      body,
      author: req.userId,
      date: new Date(),
    };

    // Add announcement to classroom
    classroom.announcements.push(announcement);
    await classroom.save();

    // Populate to return full data
    await classroom.populate("announcements.author", "firstName lastName");

    res.json({
      success: true,
      message: "Announcement posted successfully",
      classroom,
    });
  } catch (error) {
    console.error("Post announcement error:", error);
    res.status(500).json({
      success: false,
      message: "Server error posting announcement",
      error: error.message,
    });
  }
};
