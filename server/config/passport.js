const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
  
  let user = await User.findOne({ socialId: profile.id, provider: "google" });
  if (!user) {
    user = await User.create({
      username: profile.displayName,
      email: profile.emails[0].value,
      socialId: profile.id,
      provider: "google",
    });
  }
  return done(null, user);
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: "/api/auth/facebook/callback",
  profileFields: ["id", "emails", "name", "displayName"]
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ socialId: profile.id, provider: "facebook" });
  if (!user) {
    user = await User.create({
      username: profile.displayName,
      email: profile.emails?.[0]?.value || `${profile.id}@fb.com`,
      socialId: profile.id,
      provider: "facebook",
    });
  }
  return done(null, user);
}));

passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: "/api/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_liteprofile'],
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ socialId: profile.id, provider: "linkedin" });
  if (!user) {
    user = await User.create({
      username: profile.displayName,
      email: profile.emails[0].value,
      socialId: profile.id,
      provider: "linkedin",
    });
  }
  return done(null, user);
}));
