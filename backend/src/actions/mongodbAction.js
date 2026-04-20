const SavedPayload = require("../models/SavedPayload");

const mongodbAction = async (automation, payload) => {
  await SavedPayload.create({
    automationId: automation._id,
    data: payload,
  });
};

module.exports = mongodbAction;