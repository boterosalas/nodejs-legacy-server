const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (
  files,
  availableExtensions = ["png", "jpg", "jpeg", "gif"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const splitName = file.name.split(".");
    const extension = splitName[splitName.length - 1];
    if (!availableExtensions.includes(extension)) {
      return reject(`Invalid extension: ${extension}`);
    }

    const tempName = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", folder, tempName);

    file.mv(uploadPath, function (err) {
      if (err) {
        return reject(err);
      }
      resolve(tempName);
    });
  });
};

const checkFilesInParams = (req) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return;
  }
};

module.exports = {
  uploadFile,
  checkFilesInParams,
};
