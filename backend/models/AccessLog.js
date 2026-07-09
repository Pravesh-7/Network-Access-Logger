const mongoose = require("mongoose");

const accessLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    role: String,
    resource: String,
    action: String,
    status: String,
    browser: String,
    os: String,
    ipAddress: String,
    responseTime: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "AccessLog",
  accessLogSchema
);