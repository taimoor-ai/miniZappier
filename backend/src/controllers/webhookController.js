const Automation = require("../models/Automation");
const ExecutionLog = require("../models/ExecutionLog");
const actions = require("../actions");

const triggerWebhook = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const automation = await Automation.findOne({
      webhookId: id,
      isActive: true,
    });

    if (!automation) {
      return res.status(404).json({
        message: "Webhook not found",
      });
    }

    try {
      for (const action of automation.actions) {
        // console.log("Executing action:", action.type);
        const actionHandler = actions[action.type];

        if (!actionHandler) {
          throw new Error(`Unsupported action: ${action.type}`);
        }

        await actionHandler(
          {
            ...automation.toObject(),
            action,
          },
          payload,
        );
      }

      await ExecutionLog.create({
        automationId: automation._id,
        payload,
        status: "success",
      });

      return res.json({
        success: true,
        message: "Webhook executed successfully",
      });
    } catch (err) {
      await ExecutionLog.create({
        automationId: automation._id,
        payload,
        status: "failed",
        error: err.message,
      });

      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { triggerWebhook };
