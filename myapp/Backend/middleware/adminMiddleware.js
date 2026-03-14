import jwt from "jsonwebtoken";

const adminMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secure-secret");
    if (!decoded.isAdmin) return res.status(403).json({ msg: "Admin access required" });

    req.admin = decoded;
    next();
  } catch (err) {
    console.error("Admin middleware error:", err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default adminMiddleware;
