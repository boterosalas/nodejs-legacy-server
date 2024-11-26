const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields, validateJWT } = require("../middlewares");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const { categoryExistsById, productExistsById } = require("../helpers/db-validators");

const router = Router();

// Get products paged, total, populate
router.get("/", [validateJWT, validateFields], getProducts);
// Get product by id, populate
router.get(
  "/:id",
  [
    validateJWT,
    check("id", "Invalid ID").isMongoId(),
    check("id").custom(productExistsById),
    validateFields,
  ],
  getProductById
);
// Create product
router.post(
  "/",
  [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    check("category", "Category is required").not().isEmpty(),
    check("category", "Invalid category ID").isMongoId(),
    check("category").custom(categoryExistsById),
    validateFields,
  ],
  createProduct
);
// Update product
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "Invalid ID").isMongoId(),
    check("id").custom(productExistsById),
    validateFields,
  ],
  updateProduct
);
// Delete product
router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "Invalid ID").isMongoId(),
    check("id").custom(productExistsById),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
