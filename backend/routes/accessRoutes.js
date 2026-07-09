const express = require("express");
const router = express.Router();
const { checkAccess, getLogs } = require("../controllers/accessController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.post("/check", protect, checkAccess); // Accessible by all protected users
router.get("/", protect, authorize("Admin", "Security Analyst"), getLogs);

module.exports = router;