const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

module.exports = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, path.join(__dirname, "..", "public", "courses", "covers"));
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + String(Math.random(Math.random()));

    // const hashedFileName = crypto
    //   .createHash("SHA256")
    //   .update(file.originalname)
    //   .digest("hex");

    const ext = path.extname(file.originalname);
    cb(null, fileName + ext);
  },
});
