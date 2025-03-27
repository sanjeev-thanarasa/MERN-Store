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

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
