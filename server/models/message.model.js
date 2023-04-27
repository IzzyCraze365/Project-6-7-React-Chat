// Project 6: React Chat
// Team ALJI

const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
  when: {
    type: Date,
    default: Date.now(),
    required: true,
  },

  user: {
    type: String,
    required: true,
  },

  room: {
    type: String,
    required: true,
  },

  body: {
    type: String,
    required: true,
  },

  user_id: {
    // This is our foreign key to link User
    type: mongoose.Types.ObjectId,
    ref: "User",
  },

});

module.exports = mongoose.model("Messages", MessageSchema); //! Never forget this
