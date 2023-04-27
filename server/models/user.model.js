// Project 6: React Chat
// Team ALJI

const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
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
    // This is our foreign key to link User
    type: mongoose.Types.ObjectId,
    ref: "Room",
  },
});

module.exports = mongoose.model("Message", MessageSchema); //! Never forget this
