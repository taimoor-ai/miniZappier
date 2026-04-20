const mongoose = require("mongoose");

const savedPayloadSchema = new mongoose.Schema({
  automationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Automation",
  },

  data: Object,
}, { timestamps: true });

module.exports = mongoose.model(
  "SavedPayload",
  savedPayloadSchema
);