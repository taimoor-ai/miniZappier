const discordAction = require("./discordAction");
const mongodbAction = require("./mongodbAction");
const emailAction = require("./emailAction");
const actions = {
  discord: discordAction,
  mongodb: mongodbAction,
  email: emailAction,
};

module.exports = actions;