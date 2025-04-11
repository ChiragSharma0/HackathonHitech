const express = require("express");
const passport = require("passport");
const { register, login, authRedirect } = require("../controllers/authController");
const User = require("../models/User");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Local
router.post("/register", register);
router.post("/login", login);
// routes/auth.js

// GET /auth/me
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // remove password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error("Failed to fetch user:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { session: false }), authRedirect);

// Facebook
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
router.get("/facebook/callback", passport.authenticate("facebook", { session: false }), authRedirect);

// LinkedIn
router.get("/linkedin", passport.authenticate("linkedin", { scope: ["r_emailaddress", "r_liteprofile"] }));
router.get("/linkedin/callback", passport.authenticate("linkedin", { session: false }), authRedirect);

module.exports = router;
