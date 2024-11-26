const { response } = require("express");
const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");
const role = require("../models/role");
const Category = require("../models/category");

const getCategories = async (req, res = response) => {
  const { from = 0, limit = 5 } = req.query;
  const query = {
    status: true,
    // user: req.user.uid,
  };
  const [totalCategories, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query).limit(limit).skip(from).populate("user", "name"),
  ]);
  res.status(200).json({ totalCategories, categories });
};

const getCategoryById = async (req, res = response) => {
  const category = await Category.findById(req.params.id).populate(
    "user",
    "name"
  );
  return res.status(200).json({
    category,
  });
};

const createCategory = async (req, res = response) => {
  const category = await Category.findOne({
    // name: new RegExp(`^${req.body.name}$`, "i"),
    name: req.body.name,
  });
  if (category) {
    return res.status(400).json({
      msg: "Category already exists",
    });
  }
  const newCategory = new Category({
    name: req.body.name,
    user: req.user.uid,
  });
  await newCategory.save();
  return res.status(201).json({
    msg: "Category created",
    category: newCategory,
  });
};

const updateCategory = async (req, res = response) => {
  const { name } = req.body;
  const category = await Category.findByIdAndUpdate(req.params.id, {
    name,
  }).populate("user", "name");
  if (!category) {
    return res.status(404).json({
      msg: "Category not found",
    });
  }
  console.log(category);
  return res.status(200).json({
    category,
  });
};

const deleteCategory = async (req, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  const user = req.user;
  if (category.user === user.uid) {
    const currentCategory = await Category.findByIdAndUpdate(id, {
      status: false,
    });
    return res.status(200).json(currentCategory);
  }
  return res.status(401).json({
    msg: "You are not authorized to delete this category",
  });
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
