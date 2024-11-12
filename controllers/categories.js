const { response } = require("express");
const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");
const role = require("../models/role");

const getCategories = async (req, res = response) => {
  return res.status(200).json({
    msg: "getCategories",
  });
};

const getCategoriyById = async (req, res = response) => {
  return res.status(200).json({
    msg: "getCategoriyById",
  });
};

const createCategory = async (req, res = response) => {
  return res.status(200).json({
    msg: "createCategory",
  });
};

const updateCategory = async (req, res = response) => {
  return res.status(200).json({
    msg: "updateCategory",
  });
};

const deleteCategory = async (req, res = response) => {
  return res.status(200).json({
    msg: "deleteCategory",
  });
};

module.exports = {
  getCategories,
  getCategoriyById,
  createCategory,
  updateCategory,
  deleteCategory,
};
