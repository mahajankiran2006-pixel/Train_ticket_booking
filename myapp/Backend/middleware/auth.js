import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    console.log("Auth middleware: No token provided");
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secure-secret");
    if (!decoded.id) {
      console.log("Auth middleware: Token missing user ID");
      return res.status(401).json({ msg: "Invalid token: No user ID" });
    }
    req.user = { id: decoded.id };
    console.log("Auth middleware: Token verified, user ID:", decoded.id);
    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    return res.status(401).json({ msg: "Invalid token" });
  }
}