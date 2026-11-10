
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import AdminLoginRoutes from "./routes/AdminLoginRoutes.js";
import LeadRoutes from "./routes/LeadRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import ServiceRoutes from "./routes/ServiceRoutes.js";

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error("Startup blocked: JWT_SECRET is missing.");
  process.exit(1);
}

if (process.env.JWT_SECRET.length < 32) {
  console.warn("Security warning: JWT_SECRET should be at least 32 characters.");
}

if (!process.env.MONGO_URI) {
  console.error("Startup blocked: MONGO_URI is missing.");
  process.exit(1);
}

const app = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);

// CORS configuration
const allowedOrigins = (
  process.env.FRONTEND_URL ||
  "http://localhost:5173,http://127.0.0.1:5173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use((req, res, next) => {
  const origin = req.headers.origin;

  const sameOrigin = origin && (() => {
    try {
      return new URL(origin).host === req.get("host");
    } catch {
      return false;
    }
  })();

  if (!origin || allowedOrigins.includes(origin) || sameOrigin) {
    return cors({
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"]
    })(req, res, next);
  }

  return res.status(403).json({
    success: false,
    message: "Origin is not allowed"
  });
});

// Body parser
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

// Security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  next();
});

// Login and lead rate limiting
const loginAttempts = new Map();
const leadAttempts = new Map();

app.use("/api/leads", (req, res, next) => {
  if (req.method !== "POST") return next();

  const key = req.ip || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const entry = leadAttempts.get(key);

  if (!entry || now - entry.startedAt > 15 * 60 * 1000) {
    leadAttempts.set(key, { startedAt: now, count: 1 });
    return next();
  }

  if (entry.count >= 20) {
    return res.status(429).json({
      success: false,
      message: "Too many contact submissions. Please try again later."
    });
  }

  entry.count += 1;
  return next();
});

app.use("/api/admin/login", (req, res, next) => {
  const key = req.ip || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const entry = loginAttempts.get(key);

  if (!entry || now - entry.startedAt > 15 * 60 * 1000) {
    loginAttempts.set(key, { startedAt: now, count: 1 });
    return next();
  }

  if (entry.count >= 10) {
    return res.status(429).json({
      success: false,
      message: "Too many login attempts. Please try again after 15 minutes."
    });
  }

  entry.count += 1;
  return next();
});

// MongoDB connection
connectDB();

// SEO routes
app.get("/robots.txt", (req, res) => {
  const base = (
    process.env.SITE_URL || `${req.protocol}://${req.get("host")}`
  ).replace(/\/$/, "");

  res.type("text/plain").send(
    `User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: ${base}/sitemap.xml\n`
  );
});

app.get("/sitemap.xml", (req, res) => {
  const base = (
    process.env.SITE_URL || `${req.protocol}://${req.get("host")}`
  ).replace(/\/$/, "");

  const paths = ["/", "/services", "/portfolio", "/about", "/contact"];

  const urls = paths
    .map((route) => `<url><loc>${base}${route}</loc></url>`)
    .join("");

  res.type("application/xml").send(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
    </urlset>`
  );
});

// API health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running"
  });
});

// API routes
app.use("/api/admin", AdminLoginRoutes);
app.use("/api/leads", LeadRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/services", ServiceRoutes);

// Backend root route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DS Digital Studio API is running"
  });
});

// Unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

// Error handler
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);

  if (err.message === "Origin is not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "Origin is not allowed"
    });
  }

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({
      success: false,
      message: "Image must be 5 MB or smaller"
    });
  }

  console.error("Request error:", err.message);

  return res.status(500).json({
    success: false,
    message: "Something went wrong on the server"
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
