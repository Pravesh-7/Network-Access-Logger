const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getDashboardStats } = require("../controllers/dashboardController");

router.get("/dashboard", protect, getDashboardStats);

module.exports = router;