const express = require("express");
const router = express.Router();
const {
  createPolicy,
  getPolicies,
  getPolicyById,
  updatePolicy,
  deletePolicy,
} = require("../controllers/policyController");
const { protect } = require("../middleware/authMiddleware");

router.route("/")
  .post(protect, createPolicy)
  .get(protect, getPolicies);

router.route("/:id")
  .get(protect, getPolicyById)
  .put(protect, updatePolicy)
  .delete(protect, deletePolicy);

module.exports = router;