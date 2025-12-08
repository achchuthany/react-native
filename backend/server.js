const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
const config = require("./src/config/env");
const authRoutes = require("./src/routes/authRoutes");
const expenseRoutes = require("./src/routes/expenseRoutes");

// Initialize Express app
const app = express();

// Trust proxy - Required for Vercel/serverless environments
// This allows express-rate-limit to correctly identify users behind proxies
app.set("trust proxy", 1);

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting for authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  // Skip failed requests to avoid rate limiting on validation errors
  skipFailedRequests: false,
  // Skip successful requests (optional - set to true if you only want to limit failed attempts)
  skipSuccessfulRequests: false,
});

// Apply rate limiting to auth routes
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Personal Expense Tracker API",
    version: "1.0.0",
    status: "running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API is healthy",
    timestamp: new Date().toISOString(),
  });
});

// API documentation (OpenAPI via Redoc served locally)
const openApiPath = path.join(__dirname, "openapi.yaml");
const fs = require("fs");

// Serve OpenAPI YAML file
app.get("/api/docs.yaml", (req, res) => {
  res.sendFile(openApiPath);
});

// Serve Redoc documentation UI (with local redoc.standalone.js)
app.get("/api/docs", (req, res) => {
  // Serve Redoc from node_modules to avoid CSP issues
  res.type("html").send(`<!doctype html>
<html>
  <head>
    <title>Expense Tracker API Documentation</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">
    <style>
      body {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <redoc spec-url="/api/docs.yaml"></redoc>
    <script src="/redoc.standalone.js"></script>
  </body>
</html>`);
});

// Serve redoc.standalone.js locally from node_modules
app.use(
  "/redoc.standalone.js",
  express.static(
    path.join(__dirname, "node_modules/redoc/bundles/redoc.standalone.js")
  )
);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);

  // Multer file upload errors
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "File size too large. Maximum size is 5MB.",
    });
  }

  if (err.message && err.message.includes("Only image files")) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Database errors
  if (err.code === "23505") {
    return res.status(409).json({
      success: false,
      message: "Duplicate entry. This record already exists.",
    });
  }

  if (err.code === "23503") {
    return res.status(400).json({
      success: false,
      message: "Invalid reference. Related record not found.",
    });
  }

  // Default error response
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
    ...(config.nodeEnv === "development" && { stack: err.stack }),
  });
});

// Start server
const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${config.nodeEnv}`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

module.exports = app;
