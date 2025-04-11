const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// Helper: Remove sensitive fields
const sanitizeUser = (user) => {
  const { password, ...rest } = user._doc;
  return rest;
};

// ========== REGISTER ==========
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash });
    const token = generateToken(user._id);

    res.status(201).json({ user: sanitizeUser(user), token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ========== LOGIN ==========
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.status(200).json({ user: sanitizeUser(user), token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ========== SOCIAL REDIRECT ==========
exports.authRedirect = (req, res) => {
  const token = generateToken(req.user._id);

  // Pass the token AND basic user info (optional but useful)
  console.log(req.user.username,"///",req.user.profilePic);
  const redirectUrl = `${process.env.CLIENT_URL}/?token=${token}&username=${encodeURIComponent(req.user.username)}&profilePic=${encodeURIComponent(req.user.profilePic || "")}`;

  res.redirect(redirectUrl);
};
