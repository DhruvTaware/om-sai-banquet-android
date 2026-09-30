
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const connectDB = require("./config/db");
const packageRoutes = require("./routes/packageRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Configure proxy handling for deployment behind a single trusted proxy.
app.set("trust proxy", 1);

// Add HTTP security headers.
app.use(helmet());

// Allow only configured website origins and required local development origins.
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "capacitor://localhost",
  "http://localhost",
  "https://localhost",
  ...(process.env.FRONTEND_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Requests without an Origin header include native clients and
      // command-line tools. CORS is not an authentication mechanism.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
    methods: ["GET", "HEAD", "OPTIONS"],
  })
);

// Limit request body size.
app.use(express.json({ limit: "100kb" }));

// Rate-limit API requests.
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 120,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use("/api", apiLimiter);

// Package API (read-only).
app.use("/api/packages", packageRoutes);

// Basic health endpoint.
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "OM SAI Planner API is running",
  });
});

// Handle CORS and other request errors without exposing internal details.
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.message === "Origin not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "Origin not allowed.",
    });
  }

  if (err.type === "entity.too.large") {
    return res.status(413).json({
      success: false,
      message: "Request body is too large.",
    });
  }

  console.error("Request error:", err.message);

  return res.status(500).json({
    success: false,
    message: "An unexpected server error occurred.",
  });
});

// Connect to MongoDB before accepting requests.
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();