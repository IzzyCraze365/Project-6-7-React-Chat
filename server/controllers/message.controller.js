// Project 6: React Chat
// Team ALJI

// Variable List
const router = require("express").Router();
const validateSession = require("../middleware/validate-session"); // Middleware to validate tokens
const Messages = require("../models/message.model"); // Reference specific model

// http://localhost:4000/message/create
router.post("/create", validateSession, async (req, res) => {
  try {
    const { when, user, room, body } = req.body; // paramters that need to be added when creating a Message
    const chatMessage = new Messages({
      when: when,
      user: user,
      room: room,
      body: body,
      user_id: req.user._id, // Auto-Generated
      room_id: req.user.room._id, // Auto-Generated
    });

    const newChatMessage = await chatMessage.save(); // Awaits the User Input

    res.status(200).json({
      message: "A new message has been added to the room",
      chatMessage: newChatMessage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// http://localhost:4000/message/display-all
router.get("/display-all", validateSession, async (req, res) => {
  try {
    let chatMessages = await Messages.find().populate("room_id", "name"); // Displays Messages based on provided ID

    res.json({
      message: "Messages currently posted in chat Room",
      chatMessage: chatMessages,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// http://localhost:4000/message/delete/:id
router.delete("/delete/:id", validateSession, async (req, res) => {
  // Deletes Message based on specific Message ID
  try {
    const id = req.params.id;
    console.log("Message ID", id);

    const chatMessagesFound = await Messages.find({
      // Confirms the person logged in is the person who posted the specific Message
      _id: req.params.id,
      user_id: req.user._id,
    });
    if (chatMessagesFound.length === 0) {
      throw Error("404 Messages Not Found");
    }
    console.log(req.user._id); //! TEST
    const removedChatMessage = await Messages.deleteOne({
      // Only the message poster can delete it
      _id: id,
      user_id: req.user._id,
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
});

// http://localhost:4000/message/update/:id
router.patch("/update/:id", validateSession, async (req, res) => {
  try {
    const { when, user, room, body } = req.body;
    const filter = { _id: req.params.id, user_id: req.user._id }; // Confirms the person logged in is the person who posted the specific Message ID
    const chatMessageToUpdate = {
      // paramters that need to be added when creating a message
      when: when,
      user: user,
      room: room,
      body: body,
    };

    const returnUpdatedChatMessage = { new: true }; //default set to false
    const chatMessage = await Messages.findOneAndUpdate(
      filter,
      chatMessageToUpdate, // original Message that needs to be altered
      returnUpdatedChatMessage // New version of the Message, Post change
    );
    if (!chatMessage) {
      throw Error("You are not able to edit this message");
    }
    res
      .status(200)
      .json({ message: "Message has been Updated", chatMessage: chatMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; //! NEVER FORGET ME!!!!!
