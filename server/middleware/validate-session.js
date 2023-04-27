// Project 6: React Chat
// Team ALJI

const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const validateSession = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = await jwt.verify(token, process.env.JWT);
    const user = await User.findById(decodedToken.id);
    if (!user) {
      throw Error("User Not Found");
    }
    req.user = user;
    return next();
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = validateSession;