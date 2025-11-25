const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String, // plain text for demo only (NOT for real apps)
});

module.exports = mongoose.model("User", userSchema);