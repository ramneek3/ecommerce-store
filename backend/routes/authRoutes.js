const express = require("express");
const User = require("../models/User");

const router = express.Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.json({ message: "User created", userId: user._id });
  } catch (err) {
    res.status(400).json({ message: "Error registering", error: err });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  // just returning user id for now
  res.json({ message: "Login success", userId: user._id });
});

module.exports = router;