const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields, validateJWT } = require("../middlewares");
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");
const { categoryExistsById } = require("../helpers/db-validators");

const router = Router();

// Get categories paged, total, populate
router.get("/", [validateJWT, validateFields], getCategories);
// Get category by id, populate
router.get(
  "/:id",
  [
    validateJWT,
    check("id", "Invalid ID").isMongoId(),
    check("id").custom(categoryExistsById),
    validateFields,
  ],
  getCategoryById
);
// Create category
router.post(
  "/",
  [
    validateJWT,
    check("id", "Invalid ID").isMongoId(),
    check("id").custom(categoryExistsById),
    check("name", "Name is required").not().isEmpty(),
    validateFields,
  ],
  createCategory
);
// Update category
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "Invalid ID").isMongoId(),
    check("id").custom(categoryExistsById),
    check("name", "Name is required").not().isEmpty(),
    validateFields,
  ],
  updateCategory
);
// Delete category
router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "Invalid ID").isMongoId(),
    check("id").custom(categoryExistsById),
    validateFields,
  ],
  deleteCategory
);

module.exports = router;
