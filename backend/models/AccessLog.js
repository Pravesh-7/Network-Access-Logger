const mongoose = require("mongoose");

const accessLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    role: String,

    resource: String,

    status: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "AccessLog",
  accessLogSchema
);