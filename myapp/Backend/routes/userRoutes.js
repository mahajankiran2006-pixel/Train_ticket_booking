import express from "express";
import User from "../models/User.js"; // your User model
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Get all users (admin panel)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-__v"); // remove __v
    res.json(users);
  } catch (err) {
    console.error("Error fetching all users:", err.message);
    res.status(500).json({ msg: "Server error fetching users" });
  }
});

export default router;
