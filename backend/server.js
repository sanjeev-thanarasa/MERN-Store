import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productroutes from "./routes/product.route.js";

// load env
dotenv.config();

// init express
const app = express();

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json()); // allows us to accept JSON data in the req.body

// routes
app.use("/api/products", productroutes);

// error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message });
});

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log("Server started at http://localhost:" + PORT);
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1); // Exit the process with failure
  }
});
