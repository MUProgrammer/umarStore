import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Ensure uploads folder exists
const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Connect to DB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'backend/uploads')));

app.use(cookieParser());

// Serve uploaded images
app.use("/uploads", express.static(uploadPath));

// Routes
app.use("/api/users", userRoutes);

// Server
app.listen(port, () => {
  console.log(`Server running on port ${port} 🆗`);
});
