const sendEmail = require("../services/emailService");

const emailAction = async (automation, payload) => {
  const { to, subject } = automation.action.config;

  const text = `
Automation Triggered 🚀

Name: ${automation.name}

Payload:
${JSON.stringify(payload, null, 2)}
  `;

  await sendEmail({
    to,
    subject: subject || "Mini Zapier Notification",
    text,
  });
};

module.exports = emailAction;