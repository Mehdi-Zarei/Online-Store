const multer = require("multer");
const path = require("path");
// const crypto = require("crypto")

module.exports = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    let destinationFolder;

    if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
      destinationFolder = "covers";
    } else if (ext === ".mp4" || ext === ".avi" || ext === ".mkv") {
      destinationFolder = "videos";
    } else {
      return cb(
        "Unsupported file format. Only 'mp4', 'avi', and 'mkv' formats are supported for videos, and 'jpg', 'jpeg', and 'png' formats for images."
      );
    }

    cb(
      null,
      path.join(__dirname, "..", "public", "articles", destinationFolder)
    );
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
