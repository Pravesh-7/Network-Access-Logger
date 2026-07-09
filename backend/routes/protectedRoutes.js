const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const { getDashboardStats } = require("../controllers/dashboardController");

router.get("/dashboard", protect, authorize("Admin", "Security Analyst"), getDashboardStats);

module.exports = router;