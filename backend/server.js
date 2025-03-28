// Import necessary modules
import express from "express"; // Express framework for building APIs
import dotenv from "dotenv"; // For loading environment variables
import { connectDB } from "./config/db.js"; // MongoDB connection setup
import productRoutes from "./routes/product.route.js"; // Routes for product-related API endpoints

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 5001; // Use port from .env or fallback to 5001

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define API routes
app.use("/api/products", productRoutes); // All product-related routes start with /api/products

// Error handler middleware to handle errors globally
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Default to 500 if no status code is provided
  res.status(statusCode).json({ message: err.message }); // Send error message as JSON response
});

// Start the server and connect to the database
app.listen(PORT, async () => {
  try {
    await connectDB(); // Connect to MongoDB
    console.log(`Server running at http://localhost:${PORT}`); // Log server URL
  } catch (error) {
    console.error("Failed to connect to the database:", error.message); // Log database connection error
    process.exit(1); // Exit the process with failure
  }
});
