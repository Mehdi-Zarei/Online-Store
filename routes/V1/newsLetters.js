const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");
const newsLettersController = require("../../controllers/V1/newsLetters");

router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, newsLettersController.getAll)
  .post(newsLettersController.create);

module.exports = router;
