const express = require("express");
const router = express.Router();
const {
  createPolicy,
  getPolicies,
  getPolicyById,
  updatePolicy,
  deletePolicy,
} = require("../controllers/policyController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.route("/")
  .post(protect, authorize("Admin"), createPolicy)
  .get(protect, authorize("Admin", "Security Analyst"), getPolicies);

router.route("/:id")
  .get(protect, authorize("Admin", "Security Analyst"), getPolicyById)
  .put(protect, authorize("Admin"), updatePolicy)
  .delete(protect, authorize("Admin"), deletePolicy);

module.exports = router;