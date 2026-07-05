const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    resource: {
      type: String,
      required: true,
    },

    action: {
      type: String,
      enum: ["ALLOW", "DENY"],
      default: "ALLOW",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Policy", policySchema);