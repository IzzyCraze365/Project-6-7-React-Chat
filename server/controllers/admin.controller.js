// Project 6: React Chat
// Team ALJI

// Variable List
const router = require("express").Router();

const validateAdmin = require("../middleware/validate-admin"); // Middleware to validate if User has Admin Access
const validateSession = require("../middleware/validate-session"); // Middleware to validate tokens
const Messages = require("../models/message.model"); // Reference specific model
const Room = require("../models/room.model"); // Reference specific model

//! Room Management
// Does not Need Room Create or Display All since every User can perform this action

// http://localhost:4000/admin/room/delete/:id
router.delete(
  "/room/delete/:id",
  validateSession,
  validateAdmin,
  async (req, res) => {
    // Deletes Room based on specific ID
    try {
      const id = req.params.id;
      const roomsFound = await Room.find({
        // Confirms the person logged in is the person who created the Room
        _id: req.params.id,
      });

      if (roomsFound.length === 0) {
        throw Error("Not authorized to delete this chat room");
      }

      const removedRoom = await Room.deleteOne({
        // Only the Room creator can delete it
        _id: id,
      });

      res.status(200).json({
        message:
          removedRoom.deletedCount > 0
            ? "Chat room removed"
            : "No chat room was removed",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// http://localhost:4000/admin/room/update/:id
router.patch(
  "/room/update/:id",
  validateSession,
  validateAdmin,
  async (req, res) => {
    try {
      const { name, description, addedUsers } = req.body;
      const filter = { _id: req.params.id }; // Confirms the person logged in is the person who created the Room
      const roomToUpdate = {
        // paramters that need to be changed when updating a Room
        name: name,
        description: description,
        addedUsers: addedUsers,
      };

      const returnUpdatedRoom = { new: true };
      const room = await Room.findOneAndUpdate(
        filter,
        roomToUpdate, // original Room details
        returnUpdatedRoom // Updated Room details
      );

      if (!room) {
        throw Error("Not authorized to edit chat room");
      }

      res.status(200).json({ message: "Chat Room Updated", room: room });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

//! Message Management
// Does not Need Message Create or Display All since every User can perform this action
// We removed Update Messages because Only the Creator should be able to edit their messages.

// http://localhost:4000/admin/message/delete/:id
router.delete(
  "/message/delete/:id",
  validateSession,
  validateAdmin,
  async (req, res) => {
    // Deletes Message based on specific Message ID
    try {
      const id = req.params.id;
      console.log("Message ID", id);

      const chatMessagesFound = await Messages.find({
        // Confirms the person logged in is the person who posted the specific Message
        _id: req.params.id,
      });
      if (chatMessagesFound.length === 0) {
        throw Error("404 Messages Not Found");
      }
      console.log(req.user._id); //! TEST
      const removedChatMessage = await Messages.deleteOne({
        // Only the message poster can delete it
        _id: id,
      });
      console.log("Removed Message".removedChatMessage); //! TEST
      res.status(200).json({
        message:
          removedChatMessage.deletedCount > 0
            ? "Removed Message from React Chat"
            : "No Messages were removed.",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router; //! NEVER FORGET ME!!!!!
