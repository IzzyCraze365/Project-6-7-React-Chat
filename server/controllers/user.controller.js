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
    const { firstName, lastName, email, password, isAdmin } = req.body; // parameters that need to be signing up (creating a User)
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: bcrypt.hashSync(password, 10), // Auto-Encrypted
      isAdmin: isAdmin,
    });

    const newUser = await user.save(); // Awaits Input
    const adminToken = jwt.sign({ id: newUser._id }, process.env.JWT, {
      expiresIn: 60 * 60 * 4, // Provides a token if the user is Admin. //! Token expires in 4 hr
    });

    let token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: 60 * 60 * 4, // Provides a token if the passwords match.  //! Token expires in 4 hr
    });

    if (user.isAdmin) {
      res.json({
        user: newUser,
        message: "New Administrative React Chat User Created",
        token: token,
        adminToken: adminToken,
      });
    } else {
      res.json({
        user: newUser,
        message: "Created new React Chat user",
        token: token,
      });
    }
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
      let adminToken = jwt.sign({ id: user._id }, process.env.JWT, {
        expiresIn: 60 * 60 * 4, // Provides a token if the user is Admin. //! Token expires in 4 hr
      });
      let token = jwt.sign({ id: user._id }, process.env.JWT, {
        expiresIn: 60 * 60 * 4, // Provides a token if the passwords match.  //! Token expires in 4 hr
      });

      if (user.isAdmin) {
        res.json({
          message: passwordMatch
            ? "Administrator Logged In"
            : "Incorrect Password",
          token: passwordMatch ? token : "invalid token",
          adminToken: passwordMatch ? adminToken : adminToken,
          user: user
        });
      } else {
        res.json({
          message: passwordMatch
            ? "React Chat User Logged In"
            : "Incorrect Password",
          token: passwordMatch ? token : "invalid token",
          user: user
        });
      }
    } else {
      res.json({
        message: "User Not found",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// http://localhost:4000/user/delete/:id
router.delete("/delete/:id", async (req, res) => {
  // Deletes User based on specific ID
  try {
    const id = req.params.id;

    const userFound = await User.find({
      _id: req.params.id,
    });
    if (userFound.length === 0) {
      throw Error("404 User Not Found");
    }
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

// http://localhost:4000/user/update/:id
router.patch("/update/:id", async (req, res) => {
  try {
    const { firstName, lastName, email, password, isAdmin } = req.body; // paramters that need to be updated by a User
    const filter = {
      _id: req.params.id,
    }; // Confirms the person logged in can update the profile
    const userToUpdate = {
      // paramters that need to be changed when updating a User
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      isAdmin: isAdmin,
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
