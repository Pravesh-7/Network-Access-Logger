const express = require("express");

const router = express.Router();

const {
  createPolicy,
} = require("../controllers/policyController");

const {
  protect,
} = require("../middleware/authMiddleware");

router.post("/", protect, createPolicy);

module.exports = router;