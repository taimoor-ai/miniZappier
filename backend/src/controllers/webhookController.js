const Automation = require("../models/Automation");
const ExecutionLog = require("../models/ExecutionLog");
const sendDiscordMessage = require("../services/discordService");

const triggerWebhook = async (req, res) => {
  try {
    const { id } = req.params;

    const automation = await Automation.findOne({
      webhookId: id,
      isActive: true,
    });

    if (!automation) {
      return res.status(404).json({
        message: "Webhook not found",
      });
    }

    const payload = req.body;

    try {
      // Discord Action
      if (automation.action.type === "discord") {
        const discordWebhookUrl =
          automation.action.config.webhookUrl;

        const message = `
🚀 Automation Triggered

Automation: ${automation.name}

Payload:
${JSON.stringify(payload, null, 2)}
        `;

        await sendDiscordMessage(discordWebhookUrl, message);
      }

      // Success log save
      await ExecutionLog.create({
        automationId: automation._id,
        payload,
        status: "success",
      });

      return res.status(200).json({
        success: true,
        message: "Webhook executed successfully",
      });
    } catch (actionError) {
      // Failed log save
      await ExecutionLog.create({
        automationId: automation._id,
        payload,
        status: "failed",
        error: actionError.message,
      });

      return res.status(500).json({
        success: false,
        message: actionError.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  triggerWebhook,
};