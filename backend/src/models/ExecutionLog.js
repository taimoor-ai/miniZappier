const mongoose = require("mongoose");

const executionLogSchema = new mongoose.Schema(
  {
    automationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Automation",
      required: true,
    },

    payload: {
      type: Object,
      required: true,
    },

    status: {
      type: String,
      enum: ["success", "failed"],
      required: true,
    },

    error: {
      type: String,
      default: null,
    },

    executedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ExecutionLog",
  executionLogSchema
);