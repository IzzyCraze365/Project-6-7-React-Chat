// Project 6: React Chat
// Team ALJI

const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  // Schema determines how Objects are saved.
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  addedUsers: {
    type: Array,
    required: true,
  },

  user_id: {
    // This is our foreign key to link Users
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Room", RoomSchema); //! Never forget this
