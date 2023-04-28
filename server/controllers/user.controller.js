// Project 6: React Chat
// Team ALJI

// Variable List
const router = require("express").Router();
const User = require("../models/user.model"); // Reference specific model
const bcrypt = require("bcryptjs"); // Encryption!!!
const jwt = require("jsonwebtoken"); // Create the tokens that will be used in other controllers

// http:localhost:4000/user/create
router.post("/create", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body; // paramters that need to be signing up (creating a User)
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: bcrypt.hashSync(password, 10), // Auto-Encrypted
    });

    const newUser = await user.save(); // Awaits Input

    let token = jwt.sign({ id: newUser._id }, process.env.JWT, {
      expiresIn: 60 * 60 * 48, //! Token expires in 2 days
    });

    res.status(200).json({
      user: newUser,
      message: "Created new React Chat user",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// http:localhost:4000/user/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }); // Checks all created Users to find a matching email.
    if (user) {
      // If the email is found
      const passwordMatch = await bcrypt.compare(
        // it then compares the entered password with the encrypted one on file.
        req.body.password,
        user.password
      );

      let token = jwt.sign({ id: user._id }, process.env.JWT, {
        expiresIn: 60 * 60 * 12, // Provides a token if the passwords match.  //! Token expires in 12 hr
      });

      res.status(200).json({
        message: passwordMatch ? "passwords matched" : "passwords do not match",
        token: passwordMatch ? token : "invalid token",
      });
    } else {
      res.json({ message: "Email not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// http://localhost:4000/user/delete/:id //TODO This needs to be finished (we missed it)
router.delete("/delete/:id", async (req, res) => {
  // Deletes User based on specific ID
  try {
    const id = req.params.id;

    const userFound = await User.find({
      _id: req.params.id,
    });
    if (userFound.length === 0) {
      throw Error("404 User Not Found");
    };
    const removedUser = await User.deleteOne({
      _id: id,
    });

    res.status(200).json({
      message:
        removedUser.deletedCount > 0
          ? "User has been removed"
          : "No Users have been removed",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// http://localhost:4000/user/update/:id //TODO This needs to be finished (we missed it)
router.patch("/update/:id", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body; // paramters that need to be updated by a User
    const filter = { _id: req.params.id, 
    }; // Confirms the person logged in can update the profile
    const userToUpdate = {
      // paramters that need to be changed when updating a User
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    const returnUpdatedUser = { new: true };
    const user = await User.findOneAndUpdate(
      filter,
      userToUpdate, // original User details
      returnUpdatedUser // Updated User details
    );

    if (!user) {
      throw Error("Not authorized to edit User profile");
    }

    res
      .status(200)
      .json({ message: "user Profile has been updated", user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; //! NEVER FORGET ME!!!!!
