const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const Category = require("../models/category");
const Product = require("../models/product");
const User = require("../models/user");

const validCollections = ["users", "categories", "products", "roles"];

const searchUsers = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term);
  if (isMongoId) {
    const user = await User.findById(term);
    res.json({
      results: user ? [user] : [],
    });
  }
  const regexp = new RegExp(term, "i");
  const users = await User.find({
    $or: [{ name: regexp }, { email: regexp }],
    $and: [{ status: true }],
    $and: [
      {
        $or: [{ role: "ADMIN_ROLE" }, { role: "USER_ROLE" }],
      },
    ],
  });
  res.json({
    results: users,
  });
};

const searchCategories = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term);
  if (isMongoId) {
    const category = await Category.findById(term);
    res.json({
      results: category ? [category] : [],
    });
  }
  const regexp = new RegExp(term, "i");
  const categories = await Category.find({
    name: regexp,
    status: true,
  });
  res.json({
    results: categories,
  });
};

const searchProducts = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term);
  if (isMongoId) {
    const product = await Product.findById(term);
    res.json({
      results: product ? [product] : [],
    });
  }
  const regexp = new RegExp(term, "i");
  const products = await Product.find({
    $or: [{ name: regexp }, { description: regexp }],
    $and: [{ status: true }],
  });
  res.json({
    results: products,
  });
};

const search = async (req, res = response) => {
  const { collection, term } = req.params;
  if (!validCollections.includes(collection)) {
    res.status(400).json({
      msg: `Valid collections are: ${validCollections.join(", ")}`,
    });
  }
  switch (collection) {
    case "users":
      await searchUsers(term, res);
      break;
    case "categories":
      await searchCategories(term, res);
      break;
    case "products":
      await searchProducts(term, res);
      break;
    default:
      res.status(500).json({
        msg: "Not implemented",
      });
  }

  //   res.json({
  //     msg: "search",
  //     collection,
  //     term,
  //   });
};

module.exports = {
  search,
};
