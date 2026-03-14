import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import trainRoutes from "./routes/train.js";
import ticketRoutes from "./routes/ticket.js";
import contactRoutes from "./routes/contact.js";
import adminRoutes from "./routes/admin.js";
import userRoutes from "./routes/userRoutes.js";

import "./models/Train.js";
import "./models/User.js";
import "./models/Booking.js";
import "./models/Admin.js";



dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS configuration
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// MongoDB connection
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ixigo", {
    retryWrites: true,
    maxPoolSize: 10,
    connectTimeoutMS: 10000
  })
  .then(async () => {
    console.log("✅ MongoDB connected to:", mongoose.connection.db.databaseName);
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", {
      message: err.message,
      reason: err.reason || "Unknown"
    });
    process.exit(1); // Exit if DB fails to connect
  });
  
// Mount routes with unique prefixes
app.use("/api/trains", trainRoutes);
app.use("/api/users", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", userRoutes);

app.get("/station", (req, res) => {
  const filePath = path.join(__dirname, "data", "station.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Failed to read station.json:", err);
      return res.status(500).json({ error: "Failed to read stations file" });
    }
    res.json(JSON.parse(data));
  });
});


// Log registered routes after all routes are mounted
app.use((req, res, next) => {
  if (app._router && app._router.stack) {
    const routes = app._router.stack
      .filter(layer => layer.route)
      .map(layer => {
        const methods = Object.keys(layer.route.methods).join(',').toUpperCase();
        return `${methods} ${layer.route.path}`;
      })
      .join('\n');
    console.log('Registered routes:\n', routes);
  }
  next();
});



// Handle 404 errors with JSON response
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));