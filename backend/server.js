import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON requests

// Routes
app.use("/api/products", productRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message });
});

// Start server
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server running at http://localhost:${PORT}`);
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1);
  }
});
