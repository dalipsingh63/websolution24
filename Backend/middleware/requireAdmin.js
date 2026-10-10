import jwt from "jsonwebtoken";
import AdminLogin from "../models/AdminLogin.js";

export const requireAdmin = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization || "";
    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ success: false, message: "Admin authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id || decoded.role !== "admin") {
      return res.status(401).json({ success: false, message: "Invalid admin token" });
    }

    const admin = await AdminLogin.findById(decoded.id).select("_id email role");
    if (!admin || admin.role !== "admin") {
      return res.status(401).json({ success: false, message: "Admin account not found" });
    }

    req.admin = { id: String(admin._id), email: admin.email, role: admin.role };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Session expired. Please log in again." });
  }
};
