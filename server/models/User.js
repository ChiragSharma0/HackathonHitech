const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false, // Some social accounts might not have this
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: {
    type: String,
    required: false // Not needed for social accounts
  },
  provider: { 
    type: String, 
    default: "local" // or "google", "facebook", etc.
  },
  socialId: {
    type: String
  },
  profilePic: {type:String}, // <== ✅ Add this if missing

});

module.exports = mongoose.model("User", userSchema);
