// Project 6: React Chat
// Team ALJI

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // Schema determines how Objects are saved.
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("User", UserSchema); //! Never forget this
