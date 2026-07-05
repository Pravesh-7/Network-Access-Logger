const express = require("express");

const router = express.Router();

const {
  checkAccess,
} = require("../controllers/accessController");

const {
  protect,
} = require("../middleware/authMiddleware");

router.post("/check", protect, checkAccess);

module.exports = router;