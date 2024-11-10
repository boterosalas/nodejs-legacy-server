const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");
const role = require("../models/role");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.status || !bcryptjs.compareSync(password, user.password)) {
    return res.status(400).json({
      msg: "User / Password are not correct",
      user,
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

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;
  try {
    const { email, name, image } = await googleVerify(id_token);
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name,
        email,
        password: "google",
        image,
        google: true,
        role: "USER_ROLE",
      });
      await user.save();
    }
    if (!user.status) {
      return res.status(401).json({
        msg: "User is not active",
      });
    }
    const token = await generateJWT(user.id);
    return res.status(200).json({
      msg: "GoogleSignIn",
      token,
      email
    });
  } catch (error) {
    console.log({ error });
    return res.status(400).json({
      msg: "Invalid token",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
