import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Update profile
router.put("/users/MyProfile", authMiddleware, async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password; // Never update password here

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user); // Send updated user back to frontend
  } catch (err) {
    console.error("Profile update error:", err.message);
    res.status(500).json({ msg: "Server error while updating profile" });
  }
});

export default router;