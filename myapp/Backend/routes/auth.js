import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Register
router.post("/SignUp", async (req, res) => {
  try {
    console.log("Signup request body:", req.body);  // <--- ADD THIS

    const { username, firstName, lastName, email, phone, password, gender, dob, country } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ msg: "Username, email, password required" });

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) return res.status(400).json({ msg: "Username or email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      gender,
      dob,
      country,
    });

    await newUser.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Signup error full:", err); // <--- MORE DETAILED LOG
    res.status(500).json({ msg: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ msg: "Username and password required" });

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid username or password" });

    // login route
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "your-secure-secret", { expiresIn: "1d" });

    const { password: pwd, ...userData } = user._doc;
    res.json({ token, user: userData });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});


// const authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");
//   if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secure-secret");
//     req.userId = decoded.id; // <-- You are storing the user ID here
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: "Invalid token" });
//   }
// };


// Get logged-in user's profile
// In users.js router
router.get("/MyProfile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // ✅ use req.user.id
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;