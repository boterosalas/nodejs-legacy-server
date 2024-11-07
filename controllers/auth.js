const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.status || !bcryptjs.compareSync(password, user.password)) {
    return res.status(400).json({
      msg: "User / Password are not correct",
      user
    });
  }

  try {
    const token = await generateJWT(user.id);
    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

module.exports = {
  login,
};
