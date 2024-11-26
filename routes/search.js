const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields, validateJWT } = require("../middlewares");
const {
  roleIsValid,
  emailIsValid,
  userExistsById,
} = require("../helpers/db-validators");
const { search } = require("../controllers/search");

const router = Router();

router.get("/:collection/:term", search);

module.exports = router;
