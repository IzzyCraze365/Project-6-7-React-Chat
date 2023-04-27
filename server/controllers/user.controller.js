// Project 6: React Chat
// Team ALJI

const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//http:localhost:4000/user/create
router.post("/create", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: bcrypt.hashSync(password, 10),
    });

    const newUser = await user.save();

    let token = jwt.sign({ id: newUser._id }, process.env.JWT, {
      expiresIn: 60 * 60 * 48, //! Expires in 2 days
    });

    res
      .status(200)
      .json({
        user: newUser,
        message: "Created new React Chat user",
        token: token,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//http:localhost:4000/user/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );

      let token = jwt.sign({ id: user._id }, proces.env.JWT, {
        expiresIn: 60 * 60 * 12, // ! Expires in 12 hr
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

module.exports = router;
