// ============================================
// MongoDB Database Connection Configuration
// ============================================
// This file handles the connection to MongoDB
// using Mongoose ODM (Object Data Modeling)

import mongoose from "mongoose";

/**
 * Connect to MongoDB Database
 * @async
 * @function connectDB
 * @description Establishes a connection to MongoDB using the connection string from .env
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process if connection fails
  }
};

export default connectDB;
