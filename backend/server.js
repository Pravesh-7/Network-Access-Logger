const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const policyRoutes = require("./routes/policyRoutes");
const accessRoutes = require("./routes/accessRoutes");
dotenv.config();

connectDB();

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});

// Apply rate limiter to all API routes
app.use("/api/", apiLimiter);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/access", accessRoutes);

app.get("/", (req, res) => {
  res.send("Network Access Logger Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});