const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
const config = require("./src/config/env");
const authRoutes = require("./src/routes/authRoutes");
const expenseRoutes = require("./src/routes/expenseRoutes");
const postRoutes = require("./src/routes/postRoutes");
const productRoutes = require("./src/routes/productRoutes");

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
  }),
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
    message:
      "Personal Expense Tracker API, This application developed for learning purposes. Do not use in production.",
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
const { randomUUID } = require("crypto");

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
    path.join(__dirname, "node_modules/redoc/bundles/redoc.standalone.js"),
  ),
);

// Privacy Policy page
app.get("/privacy-policy", (req, res) => {
  res.type("html").send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Privacy Policy – Vertex Expense Tracker</title>
    <style>
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        background: #f5f5f7;
        color: #1d1d1f;
        line-height: 1.7;
      }
      header {
        background: #1c1c1e;
        color: #f5f5f7;
        padding: 2rem 1.5rem;
        text-align: center;
      }
      header h1 { font-size: 1.8rem; font-weight: 700; }
      header p { margin-top: 0.4rem; font-size: 0.95rem; color: #aeaeb2; }
      main {
        max-width: 800px;
        margin: 2.5rem auto;
        background: #ffffff;
        border-radius: 12px;
        padding: 2.5rem 2rem;
        box-shadow: 0 2px 12px rgba(0,0,0,0.08);
      }
      .notice {
        background: #fff3cd;
        border-left: 4px solid #f59e0b;
        border-radius: 6px;
        padding: 1rem 1.2rem;
        margin-bottom: 2rem;
        font-size: 0.92rem;
        color: #78350f;
      }
      h2 {
        font-size: 1.15rem;
        font-weight: 600;
        margin: 2rem 0 0.6rem;
        color: #1c1c1e;
        border-bottom: 1px solid #e5e5ea;
        padding-bottom: 0.4rem;
      }
      p { margin-bottom: 0.8rem; font-size: 0.97rem; }
      ul { margin: 0.4rem 0 0.8rem 1.4rem; }
      ul li { margin-bottom: 0.35rem; font-size: 0.97rem; }
      a { color: #0071e3; text-decoration: none; }
      a:hover { text-decoration: underline; }
      footer {
        text-align: center;
        padding: 1.5rem;
        font-size: 0.85rem;
        color: #6e6e73;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>Privacy Policy</h1>
      <p>Vertex Expense Tracker &nbsp;|&nbsp; Effective date: 2 April 2026</p>
    </header>
    <main>
      <div class="notice">
        <strong>Important Notice:</strong> Vertex Expense Tracker is developed strictly for educational and academic purposes. It is not intended for public, commercial, or production use. Any data collected is used solely within the scope of this educational project.
      </div>

      <p>Vertex Expense Tracker ("we", "our", or "us") respects your privacy. This Privacy Policy explains what data we collect, how we use it, and your choices.</p>

      <h2>1. Information We Collect</h2>
      <p>We may collect the following information when you use the app:</p>
      <ul>
        <li>Account information (for example: name and email) provided during authentication</li>
        <li>Expense records you create (for example: amount, category, description, date, receipt reference)</li>
        <li>Basic technical information required to operate and secure the service</li>
      </ul>

      <h2>2. How We Use Information</h2>
      <p>We use collected information to:</p>
      <ul>
        <li>Authenticate users and maintain secure sessions</li>
        <li>Display your profile and expense data in the app</li>
        <li>Improve app reliability, security, and performance</li>
        <li>Respond to support requests</li>
      </ul>

      <h2>3. Data Sharing</h2>
      <p>We do not sell your personal information.</p>
      <p>We may share data only with service providers or infrastructure required to operate the app (for example: API hosting), and only as needed to provide the service.</p>

      <h2>4. Data Security</h2>
      <p>We use reasonable safeguards to protect your information:</p>
      <ul>
        <li>Data transmission uses HTTPS</li>
        <li>Authentication tokens are stored securely on device using platform secure storage</li>
      </ul>
      <p>No system is 100% secure, but we continuously improve protections.</p>

      <h2>5. Data Retention</h2>
      <p>We retain data only as long as necessary to provide app functionality and meet legal or operational requirements.</p>

      <h2>6. Your Rights</h2>
      <p>Depending on your region, you may have rights to:</p>
      <ul>
        <li>Access your data</li>
        <li>Correct inaccurate data</li>
        <li>Request deletion of your data</li>
      </ul>
      <p>To make a request, contact: <a href="mailto:info@achchuthan.lk">info@achchuthan.lk</a></p>

      <h2>7. Educational Use Disclaimer</h2>
      <p>This application was created as part of an academic/educational project. It is not deployed or maintained as a commercial product. The app is provided as-is for learning and demonstration purposes only. Users interact with the app at their own discretion, understanding its educational scope.</p>
      <p>The developer (Y. Achchuthan) makes no warranties about the app's fitness for any purpose beyond education.</p>

      <h2>8. Children's Privacy</h2>
      <p>This app is not directed to children under 13 (or the minimum age required by local law). We do not knowingly collect personal information from children.</p>

      <h2>9. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. Updates will be posted at the same URL with an updated effective date.</p>

      <h2>10. Contact</h2>
      <p>If you have questions about this Privacy Policy, contact:</p>
      <ul>
        <li>Email: <a href="mailto:info@achchuthan.lk">info@achchuthan.lk</a></li>
        <li>Developer: Y. Achchuthan</li>
      </ul>
    </main>
    <footer>
      &copy; 2026 Y. Achchuthan &nbsp;&bull;&nbsp; Package: lk.achchuthan.vertex &nbsp;&bull;&nbsp; Educational project only
    </footer>
  </body>
</html>`);
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/products", productRoutes);

// --- Mock Demo Endpoints (study purpose, no auth required) ---
// In-memory sample expenses
let mockExpenses = [
  {
    id: randomUUID(),
    amount: 19.99,
    category: "food",
    description: "Lunch",
    date: "2025-12-01T12:00:00.000Z",
  },
  {
    id: randomUUID(),
    amount: 49.5,
    category: "transport",
    description: "Monthly pass",
    date: "2025-12-02T08:00:00.000Z",
  },
  {
    id: randomUUID(),
    amount: 75.0,
    category: "shopping",
    description: "Groceries",
    date: "2025-12-03T17:30:00.000Z",
  },
  {
    id: randomUUID(),
    amount: 12.0,
    category: "entertainment",
    description: "Movie",
    date: "2025-12-04T20:00:00.000Z",
  },
  {
    id: randomUUID(),
    amount: 5.5,
    category: "coffee",
    description: "Latte",
    date: "2025-12-05T09:15:00.000Z",
  },
  {
    id: randomUUID(),
    amount: 120.0,
    category: "utilities",
    description: "Electricity bill",
    date: "2025-12-06T14:00:00.000Z",
  },
  {
    id: randomUUID(),
    amount: 30.0,
    category: "health",
    description: "Pharmacy",
    date: "2025-12-07T11:45:00.000Z",
  },
  {
    id: randomUUID(),
    amount: 60.0,
    category: "education",
    description: "Online course",
    date: "2025-12-08T19:00:00.000Z",
  },
  {
    id: randomUUID(),
    amount: 25.0,
    category: "gift",
    description: "Birthday present",
    date: "2025-12-09T16:30:00.000Z",
  },
  {
    id: randomUUID(),
    amount: 15.0,
    category: "misc",
    description: "Stationery",
    date: "2025-12-10T10:00:00.000Z",
  },
  {
    id: randomUUID(),
    amount: 80.0,
    category: "travel",
    description: "Weekend trip",
    date: "2025-12-11T07:00:00.000Z",
  },
  {
    id: randomUUID(),
    amount: 45.0,
    category: "dining",
    description: "Dinner with friends",
    date: "2025-12-12T18:30:00.000Z",
  },
];

// GET /api/mock/expenses -> returns a simple array of expenses
// pagination
app.get("/api/mock/expenses", (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedExpenses = mockExpenses.slice(startIndex, endIndex);
  res.json({ success: true, expenses: paginatedExpenses });
});

// POST /api/mock/expenses -> echoes payload with a random id
app.post("/api/mock/expenses", (req, res) => {
  const { amount, category, description, date } = req.body || {};
  if (amount == null || !category || !description) {
    return res.status(400).json({
      success: false,
      message: "Provide amount, category, and description",
    });
  }
  const expense = {
    id: randomUUID(),
    amount: typeof amount === "string" ? parseFloat(amount) : amount,
    category,
    description,
    date: date || new Date().toISOString(),
  };
  // Do NOT persist in memory - just return the created expense
  // (This is study/demo mode, no persistence needed)
  res.status(201).json({ success: true, data: { expense } });
});

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
