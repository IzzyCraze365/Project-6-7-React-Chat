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

  room_id: {
    // This is our foreign key to link Users
    type: mongoose.Types.ObjectId,
    ref: "Room",
  },
});

module.exports = mongoose.model("User", UserSchema); //! Never forget this
