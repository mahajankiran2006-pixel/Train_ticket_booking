import jwt from "jsonwebtoken";

const userMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secure-secret");
    req.user = { id: decoded.id }; // attach user info
    next();
  } catch (err) {
    console.error("User middleware error:", err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default userMiddleware;
