const Automation = require("../models/Automation");
const { v4: uuidv4 } = require("uuid");

const createAutomation = async (req, res) => {
  try {
    const { name, trigger, action } = req.body;

    if (!req.body) {
      return res.status(400).json({
        message: "Request body is missing",
      });
    }
    
    let webhookId = null;

    // Sirf webhook trigger ke liye unique URL generate karo
    if (trigger.type === "webhook") {
      webhookId = uuidv4();
    }

    const automation = await Automation.create({
      userId: req.user.id,
      name,
      trigger,
      action,
      webhookId,
    });

    res.status(201).json({
      message: "Automation created successfully",
      automation: {
        ...automation._doc,

        webhookUrl: webhookId
          ? `${process.env.webhookUrl}/${webhookId}`
          : null,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAutomations = async (req, res) => {
  try {
    const automations = await Automation.find({
      userId: req.user.id,
    });

    const formatted = automations.map((automation) => ({
      ...automation._doc,

      webhookUrl: automation.webhookId
        ? `${process.env.webhookUrl}/${automation.webhookId}`
        : null,
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createAutomation,
  getAutomations,
};