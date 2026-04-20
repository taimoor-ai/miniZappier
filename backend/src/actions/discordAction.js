const sendDiscordMessage = require("../services/discordService");

const discordAction = async (automation, payload) => {
  const discordWebhookUrl = automation.action.config.webhookUrl;

  const message = `
🚀 Automation Triggered

Automation: ${automation.name}

Payload:
${JSON.stringify(payload, null, 2)}
  `;

  await sendDiscordMessage(discordWebhookUrl, message);
};

module.exports = discordAction;