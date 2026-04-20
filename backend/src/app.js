const express = require('express');
const app = express();
const authRoutes = require("./routes/authRoutes");
const automationRoutes = require("./routes/automationRoutes");
const webhookRoutes = require("./routes/webhookRoutes");




// Middleware
app.use(express.json());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/automations", automationRoutes);
app.use("/api/webhooks", webhookRoutes);
app.get('/', (req, res) => {
  res.send('API is running...');
});


module.exports = app;