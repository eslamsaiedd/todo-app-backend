
const mongoose = require('mongoose')

// connect with data

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL)
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("Database connection failed");
      return
  }
};

module.exports = connectDB;