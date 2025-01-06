const { response } = require("express");
const { uploadFile: uploadFileHelper } = require("../helpers");
const { User, Product } = require("../models");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const usersPath = "users";
const productsPath = "products";

const uploadFile = async (req, res = response) => {
  try {
    const path = await uploadFileHelper(req.files);
    res.status(200).json({ msg: `File uploaded to ${path}` });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const updateUserImage = async (req, res = response) => {
  try {
    const userDB = await User.findById(req.user.uid);
    if (!userDB) {
      res.status(400).json({ msg: "User not found." });
      return;
    }
    if (userDB.image) {
      const pathCurrentImage = path.join(
        __dirname,
        "../uploads",
        usersPath,
        userDB.image
      );
      if (fs.existsSync(pathCurrentImage)) {
        fs.unlinkSync(pathCurrentImage);
      }
    }
    const pathNewImage = await uploadFileHelper(
      req.files,
      undefined,
      usersPath
    );
    userDB.image = pathNewImage;
    await userDB.save();
    res.status(200).json(userDB);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const updateProductImage = async (req, res = response) => {
  try {
    const productDB = await Product.findById(req.params.id);
    if (!productDB) {
      res.status(400).json({ msg: "Product not found." });
      return;
    }
    if (productDB.image) {
      const pathCurrentImage = path.join(
        __dirname,
        "../uploads",
        productsPath,
        productDB.image
      );
      if (fs.existsSync(pathCurrentImage)) {
        fs.unlinkSync(pathCurrentImage);
      }
    }
    const pathNewImage = await uploadFileHelper(
      req.files,
      undefined,
      productsPath
    );
    productDB.image = pathNewImage;
    await productDB.save();
    res.status(200).json(productDB);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

const updateProductImageCloudinary = async (req, res = response) => {
  try {
    const productDB = await Product.findById(req.params.id);
    if (!productDB) {
      res.status(400).json({ msg: "Product not found." });
      return;
    }
    if (productDB.image) {
      console.log(productDB);
      const splitUrl = productDB.image.split("/");
      const splitName = splitUrl[splitUrl.length - 1].split(".");
      const imageId = splitName[0];
      cloudinary.uploader.destroy(imageId);
    }
    const { tempFilePath } = req.files.file;
    const { url } = await cloudinary.uploader.upload(tempFilePath);
    productDB.image = url;
    await productDB.save();
    return res.status(200).json(productDB);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

module.exports = {
  uploadFile,
  updateUserImage,
  updateProductImage,
  updateProductImageCloudinary,
};
