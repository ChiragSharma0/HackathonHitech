const express = require("express");
const passport = require("passport");
const { register, login, authRedirect } = require("../controllers/authController");

const router = express.Router();

// Local
router.post("/register", register);
router.post("/login", login);

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
