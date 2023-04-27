// Project 6: React Chat
// Team ALJI

const router = require("express").Router();
const validateSession = require("../middleware/validate-session");
const Room = require("../models/room.model");

//http:localhost:4000/room/create
router.post("/create", validateSession, async (req, res) => {
    try {
        const { name, description, addedUsers } = req.body;
        const room = new Room({
            name: name,
            description: description,
            addedUsers: addedUsers,
            user_id: req.user._id,
        });

        const newRoom = await room.save();
        res.status(200).json({message: "Room was created", room: newRoom});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//http://localhost:4000/room/display-all
router.get("/display-all", validateSession, async (req, res) => {
    try {
        let rooms = await Room.find().populate("name");
        res.status(200).json({message: "All current chat rooms!", rooms: rooms});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// http://localhost:4000/room/delete/:id
router.delete("/delete/:id", validateSession, async (req, res) => {
    try {
        const id = req.params.id;
        const roomsFound = await Room.find({
            _id: req.params.id,
            user_id: req.user._id,
        });

        if(roomsFound.length === 0) {
            throw Error("Not authorized to delete this chat room")
        }

        const removedRoom = await Room.deleteOne({_id: id, user_id: req.user._id});

        res.status(200).json({message: removedRoom.deletedCount > 0 
            ? "Chat room removed"
            : "No chat room was removed"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// http://localhost:4000/room/update/:id
router.patch("/update/:id", validateSession, async (req, res) => {
    try {
        const { name, description, addedUsers } = req.body;
        const filter = {_id: req.params.id, user_id: req.user._id};
        const roomToUpdate = {
            name: name,
            descriptions: description,
            addedUsers: addedUsers,
        };

        const returnUpdatedRoom = { new: true };
        const room = await Room.findOneAndUpdate(filter, roomToUpdate, returnUpdatedRoom);

        if(!room) {
            throw Error("Not authorized to edit chat room");
        }

        res.status(200).json({message: "Chat updated", room: room});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});




module.exports = router;