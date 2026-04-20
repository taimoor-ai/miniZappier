const Automation = require("../models/Automation");
const ExecutionLog = require("../models/ExecutionLog");
const evaluateConditions = require("../utils/evaluateConditions");
const automationQueue = require("../queues/automationQueue");

const triggerWebhook = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    console.log("1. Request received");
    // Find matching automation
    const automation = await Automation.findOne({
      webhookId: id,
      isActive: true,
    });

    if (!automation) {
      return res.status(404).json({
        success: false,
        message: "Webhook not found",
      });
    }
    console.log("2. Automation found");
    // Check conditions before queueing
    const conditionsPassed = evaluateConditions(
      automation.conditions,
      payload
    );

    if (!conditionsPassed) {
      await ExecutionLog.create({
        automationId: automation._id,
        payload,
        status: "failed",
        error: "Conditions not met",
      });

      return res.status(200).json({
        success: true,
        message: "Conditions not met. Automation not executed.",
      });
    }

    // Add automation to queue
    await automationQueue.add(
      "execute-automation",
      {
        automation: automation.toObject(),
        payload,
      },
      {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 2000,
        },
        removeOnComplete: true,
        removeOnFail: false,
      }
    );

    // Save queue success log
    await ExecutionLog.create({
      automationId: automation._id,
      payload,
      status: "success",
    });
     console.log("3. Job added to queue");
    return res.status(200).json({
      success: true,
      message: "Automation queued successfully",
    });
  } catch (error) {
    console.error("Webhook Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  triggerWebhook,
};