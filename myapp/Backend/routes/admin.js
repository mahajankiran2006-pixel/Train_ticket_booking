import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import mongoose from "mongoose";
import Train from "../models/Train.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Admin login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ msg: "Username and password required" });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ msg: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid username or password" });
    }

    const token = jwt.sign(
  { isAdmin: true }, // ✅ no _id needed
  process.env.JWT_SECRET || "your-secure-secret",
  { expiresIn: "1d" }
);

    const { password: pwd, ...adminData } = admin._doc;
    console.log("Backend: Admin login successful:", adminData);
    res.json({ token, admin: adminData });
  } catch (err) {
    console.error("Backend: Admin login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});



// Get total counts
router.get("/stats", adminMiddleware, async (req, res) => {
  try {
    const Train = mongoose.model("searchTrains");
    const User = mongoose.model("users");
    const Booking = mongoose.model("bookings");

    const totalTrains = await Train.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalBookings = await Booking.countDocuments();

    console.log("Backend: Admin stats fetched:", { totalTrains, totalUsers, totalBookings });
    res.json({
      totalTrains,
      totalUsers,
      totalBookings,
    });
  } catch (err) {
    console.error("Backend: Stats error:", err);
    res.status(500).json({ msg: "Server error fetching stats" });
  }
});



router.post("/addTrain", adminMiddleware, async (req, res) => {
  try {
    const train = new Train(req.body); // MongoDB will auto-generate _id
    await train.save();
    res.json({ message: "Train added successfully", train });
  } catch (err) {
    console.error("Add train error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;