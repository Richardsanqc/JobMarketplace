const express = require("express");
const connectDatabase = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// Connect to the Database
connectDatabase();

// Initialise Middleware
app.use(express.json());
app.use(cookieParser());

// Configure CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Use environment variable
    credentials: true, // Allow credentials (cookies, etc.)
  })
);

// Define API Routes
app.use("/api/auth", authRoutes); // Authentication routes

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

// Define PORT
const PORT = process.env.PORT || 5050;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Handle shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
  });
});
