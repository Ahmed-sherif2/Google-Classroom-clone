// ============================================
// User Model
// ============================================
// Defines the User schema for MongoDB
// Stores user information like email, password, name, role

import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    // First name of the user
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },

    // Last name of the user
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },

    // Email address (must be unique)
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email"],
    },

    // Hashed password (stored securely)
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 4,
      select: false, // Don't return password by default
    },

    // User role: 'student' or 'teacher'
    role: {
      type: String,
      enum: ["student", "teacher"],
      default: "student",
    },

    // User's phone number (optional)
    phone: {
      type: String,
      default: null,
    },

    // User's location (optional)
    location: {
      type: String,
      default: null,
    },

    // User's bio (optional)
    bio: {
      type: String,
      default: null,
    },

    // Avatar emoji or URL (optional)
    avatar: {
      type: String,
      default: "👤",
    },

    // Array of classroom IDs the user is enrolled in
    classrooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Classroom",
      },
    ],

    // Whether the user account is active
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// ============================================
// Password Hashing Middleware
// ============================================
// Hash password before saving to database (only if password is modified)
userSchema.pre("save", async function (next) {
  // Skip if password wasn't modified
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Generate salt for hashing
    const salt = await bcryptjs.genSalt(10);

    // Hash the password
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// ============================================
// Password Comparison Method
// ============================================
// Method to compare plain text password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// Create and export the User model
const User = mongoose.model("User", userSchema);
export default User;
