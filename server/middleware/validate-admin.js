// Project 6: React Chat
// Team ALJI

const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const validateAdmin = async (req, res, next) => {

  try {
    const adminToken = req.headers.administrator;
    const decodedAdminToken = await jwt.verify(adminToken, process.env.JWT);
    const admin = await User.findById(decodedAdminToken.id);
    if (!admin) {
      throw Error("This Account does not have Administrative Privilages.");
    }
    req.admin = admin;
    return next();
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = validateAdmin;
