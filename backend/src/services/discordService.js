const axios = require("axios");

const sendDiscordMessage = async (webhookUrl, message) => {
  await axios.post(webhookUrl, {
    content: message,
  });
};

module.exports = sendDiscordMessage;