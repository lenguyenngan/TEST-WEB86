import express from "express";
import mongoose from "mongoose";
import userRoutes from "./src/routes/userRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
import bodyParser from "body-parser";
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://ngannguyen206322:KHyjrznBHX52b6z3@cluster0.4x9d7.mongodb.net/DataTest"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/users", userRoutes);
// app.use("/posts", postRoutes);
app.use("/api/v1/posts", postRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
