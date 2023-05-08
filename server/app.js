// Project 6: React Chat
// Team ALJI

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors"); 
const adminController = require("./controllers/admin.controller");
const messageController = require("./controllers/message.controller");
const roomController = require("./controllers/room.controller");
const userController = require("./controllers/user.controller");

const mongoose = require("mongoose");

const PORT = process.env.PORT;

mongoose.connect(process.env.DATABASEURL);
const db = mongoose.connection;

db.once("open", () => console.log("Connected to the DB"));

app.use(cors());
app.use(express.json());
app.use("/admin", adminController);
app.use("/user", userController);
app.use("/room", roomController);
app.use("/message", messageController);

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
