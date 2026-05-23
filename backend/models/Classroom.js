// ============================================
// Classroom Model
// ============================================
// Defines the Classroom schema for MongoDB
// Stores classroom information and related data

import mongoose from "mongoose";

// Define the Classroom Schema
const classroomSchema = new mongoose.Schema(
  {
    // Classroom name/title
    name: {
      type: String,
      required: [true, "Classroom name is required"],
      trim: true,
    },

    // Section/period of the classroom
    section: {
      type: String,
      required: true,
    },

    // Description of what the classroom is about
    description: {
      type: String,
      required: true,
    },

    // Hex color code for the classroom card
    color: {
      type: String,
      default: "#667eea",
    },

    // Emoji icon for the classroom
    icon: {
      type: String,
      default: "📚",
    },

    // Teacher/Creator ID (reference to User model)
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Array of student IDs enrolled in this classroom
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Unique classroom code for students to join
    classCode: {
      type: String,
      unique: true,
      default: () => {
        // Generate random 8-character code
        return Math.random().toString(36).substring(2, 10).toUpperCase();
      },
    },

    // Array of announcements posted in the classroom
    announcements: [
      {
        // Announcement ID
        id: mongoose.Schema.Types.ObjectId,
        // Announcement title
        title: String,
        // Announcement body/content
        body: String,
        // User who posted the announcement
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        // Date posted
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Whether classroom is archived
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Create and export the Classroom model
const Classroom = mongoose.model("Classroom", classroomSchema);
export default Classroom;
