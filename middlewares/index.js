const validateFields = require("./validate-fields");
const validateJWT = require("./validate-jwt");
const validateRole = require("./validate-role");
const validateFileUpload = require("./validate-file-upload");

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateRole,
  ...validateFileUpload,
};
