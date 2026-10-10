import jwt from "jsonwebtoken";
import AdminLogin from "../models/AdminLogin.js";

// Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured");
      return res.status(500).json({ success: false, message: "Server authentication is not configured" });
    }

    if (typeof email !== "string" || typeof password !== "string" || password.length > 200) {
      return res.status(400).json({ success: false, message: "Invalid email or password format" });
    }

    // Email aur password check
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Admin ko database me find karo
    const admin = await AdminLogin.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin email or password",
      });
    }

    // Password verify karo
    const isPasswordMatch = await admin.matchPassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin email or password",
      });
    }

    // JWT token generate karo
    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during admin login",
    });
  }
};