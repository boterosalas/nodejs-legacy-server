const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const {
  getCategories,
  getCategoriyById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");

const router = Router();

router.get("/", [validateFields], getCategories);
router.get("/:id", [validateFields], getCategoriyById);
router.post("/", [validateFields], createCategory);
router.put("/:id", [validateFields], updateCategory);
router.delete("/:id", [validateFields], deleteCategory);

module.exports = router;
