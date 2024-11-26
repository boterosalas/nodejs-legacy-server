const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = async (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No token provided",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await User.findById(uid);
    if (!user) {
      return res.status(401).json({
        msg: "Invalid token - user does not exist",
      });
    }
    if (!user.status) {
      return res.status(401).json({
        msg: "Invalid token - user is inactive",
      });
    }
    req.user = user.toJSON();
    next();
  } catch (error) {
    console.log("validateJWT", error);
    return res.status(401).json({
      msg: "Invalid token",
    });
  }
};

module.exports = {
  validateJWT,
};
