const { response } = require("express");
const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");
const role = require("../models/role");
const Category = require("../models/category");
const Product = require("../models/product");
const path = require("path");
const fs = require("fs");
const productsPath = "products";
const defaultImage = path.join(__dirname, "../assets", "no-image.jpg");

const getProducts = async (req, res = response) => {
  const { from = 0, limit = 5 } = req.query;
  const query = {
    status: true,
    // user: req.user.uid,
  };
  const [totalProducts, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query).limit(limit).skip(from).populate("category", "name"),
  ]);
  res.status(200).json({ totalProducts, products });
};

const getProductById = async (req, res = response) => {
  const product = await Product.findById(req.params.id).populate(
    "category",
    "name"
  );
  return res.status(200).json({
    product,
  });
};

const createProduct = async (req, res = response) => {
  const { status, user, ...body } = req.body;
  const product = await Product.findOne({
    // name: new RegExp(`^${req.body.name}$`, "i"),
    name: req.body.name,
  });
  if (product) {
    return res.status(400).json({
      msg: "Product already exists",
    });
  }
  const newProduct = new Product({
    ...body,
    name: req.body.name,
    user: req.user.uid,
  });
  await newProduct.save();
  return res.status(201).json({
    msg: "Product created",
    product: newProduct,
  });
};

const updateProduct = async (req, res = response) => {
  const { status, user, ...body } = req.body;
  const product = await Product.findByIdAndUpdate(req.params.id, body, {
    new: true,
  }).populate("category", "name");
  if (!product) {
    return res.status(404).json({
      msg: "Product not found",
    });
  }
  console.log(product);
  return res.status(200).json({
    product,
  });
};

const deleteProduct = async (req, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product.user === req.user.uid) {
    const currentProduct = await Product.findByIdAndUpdate(
      id,
      {
        status: false,
      },
      { new: true }
    );
    return res.status(200).json(currentProduct);
  }
  return res.status(401).json({
    msg: "You are not authorized to delete this product",
  });
};

const showImage = async (req, res = response) => {
  const { id } = req.params;
  const productDB = await Product.findById(id);
  if (productDB.image) {
    const pathCurrentImage = path.join(
      __dirname,
      "../uploads",
      productsPath,
      productDB.image
    );
    if (fs.existsSync(pathCurrentImage)) {
      console.log(pathCurrentImage);
      return res.status(200).sendFile(pathCurrentImage);
    }
  }
  return res.status(200).sendFile(defaultImage);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  showImage,
};
