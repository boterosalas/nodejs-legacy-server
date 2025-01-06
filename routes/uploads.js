const { Router } = require("express");
const { check } = require("express-validator");
const {
  validateFields,
  validateJWT,
  validateFileUpload,
} = require("../middlewares");
const {
  uploadFile,
  updateUserImage,
  updateProductImage,
  updateProductImageCloudinary,
  showImage,
} = require("../controllers/uploads");
const { productExistsById } = require("../helpers");

const router = Router();

router.post("/", [validateJWT, validateFields], uploadFile);
router.put(
  "/user",
  [validateJWT, validateFileUpload, validateFields],
  updateUserImage
);
router.put(
  "/product/:id",
  [
    validateJWT,
    validateFileUpload,
    check("id", "Invalid ID").isMongoId(),
    check("id").custom(productExistsById),
    validateFields,
  ],
  updateProductImageCloudinary
//   updateProductImage
);

module.exports = router;
