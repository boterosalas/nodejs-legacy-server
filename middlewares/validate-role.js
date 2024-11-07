const { response } = require("express");

const isAdmin = async (req, res = response, next) => {
  const user = req.user;
  if (user.role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: "You are not authorized to perform this action",
    });
  }
  next();
};

const hasRole = (...roles) => {
  return (req, res = response, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: "You are not authorized to perform this action",
      });
    }
    next();
  };
};

module.exports = {
  isAdmin,
  hasRole,
};
