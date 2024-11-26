const { Category, User, Product } = require("../models");
const Role = require("../models/role");

const roleIsValid = async (role = "") => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`Role ${role} does not exist`);
  }
};

const emailIsValid = async (email = "") => {
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error(`Email ${email} already exists`);
  }
};

const userExistsById = async (id = "") => {
  try {
    const userExists = await User.findById(id);
    if (!userExists) {
      throw new Error(`User with id ${id} does not exist`);
    }
  } catch (error) {
    console.log("userExistsByIdError: ", error);
    throw new Error(`User with id ${id} does not exist`);
  }
};

const categoryExistsById = async (id = "") => {
  try {
    const categoryExists = await Category.findById(id);
    if (!categoryExists) {
      throw new Error(`Category with id ${id} does not exist`);
    }
  } catch (error) {
    console.log("categoryExistsByIdError: ", error);
    throw new Error(`Category with id ${id} does not exist`);
  }
};

const productExistsById = async (id = "") => {
  try {
    const productExists = await Product.findById(id);
    if (!productExists) {
      throw new Error(`Product with id ${id} does not exist`);
    }
  } catch (error) {
    console.log("productExistsByIdError: ", error);
    throw new Error(`Product with id ${id} does not exist`);
  }
};

module.exports = {
  roleIsValid,
  emailIsValid,
  userExistsById,
  categoryExistsById,
  productExistsById
};
