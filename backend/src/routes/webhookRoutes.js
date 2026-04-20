const express = require("express");
const router = express.Router();

const {
  triggerWebhook,
} = require("../controllers/webhookController");

router.post("/:id", triggerWebhook);

module.exports = router;