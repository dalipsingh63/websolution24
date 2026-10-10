import dotenv from "dotenv";
import mongoose from "mongoose";
import AdminLogin from "./models/AdminLogin.js";

dotenv.config();

const createAdmin = async () => {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!process.env.MONGO_URI || !email || !password || password.length < 12) {
    console.error("Set MONGO_URI, ADMIN_EMAIL and ADMIN_PASSWORD (at least 12 characters) in Backend/.env before creating an admin.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    const existingAdmin = await AdminLogin.findOne({ email });
    if (existingAdmin) {
      console.log("Admin already exists. No changes made.");
      await mongoose.disconnect();
      process.exit(0);
    }

    const admin = await AdminLogin.create({ email, password, role: "admin" });
    console.log(`Admin created successfully for ${admin.email}`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Create Admin Error:", error.message);
    process.exit(1);
  }
};

createAdmin();
