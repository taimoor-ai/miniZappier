const mongoose = require("mongoose");

const automationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    trigger: {
      type: {
        type: String,
        required: true,
        enum: ["webhook", "github", "stripe"],
      },

      config: {
        type: Object,
        default: {},
      },
    },

    actions: [
  {
    type: {
      type: String,
      required: true,
      enum: ["discord", "email", "mongodb"],
    },

    config: {
      type: Object,
      default: {},
    },
  },
],
    conditions: [
  {
    field: {
      type: String,
      required: true,
    },

    operator: {
      type: String,
      required: true,
      enum: [">", "<", ">=", "<=", "==", "!=", "includes"],
    },

    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
],
    webhookId: {
      type: String,
      unique: true,
      sparse: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Automation", automationSchema);