const ExecutionLog = require("../models/ExecutionLog");
const Automation = require("../models/Automation");

const getLogs = async (req, res) => {
  try {
    // sirf current user ki automations ke logs
    const automations = await Automation.find({
      userId: req.user.id,
    });

    const automationIds = automations.map(
      (automation) => automation._id
    );

    const logs = await ExecutionLog.find({
      automationId: { $in: automationIds },
    })
      .populate("automationId", "name")
      .sort({ createdAt: -1 });

    res.json(logs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getLogs,
};