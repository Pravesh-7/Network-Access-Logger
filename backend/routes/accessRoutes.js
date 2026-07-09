const express = require("express");
const router = express.Router();
const { checkAccess, getLogs } = require("../controllers/accessController");
const { protect } = require("../middleware/authMiddleware");

router.post("/check", protect, checkAccess);
router.get("/", protect, getLogs);

module.exports = router;