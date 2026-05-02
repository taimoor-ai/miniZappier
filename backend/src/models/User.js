const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  googleId: String,
  picture: String,
  provider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },
});

module.exports = mongoose.model("User", userSchema);