const express = require("express");
const articlesRouter = express.Router();
const articlesController = require("../../controllers/V1/article");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");
const multer = require("multer");
const multerStorage = require("../../utils/uploader");

articlesRouter
  .route("/")
  .get(articlesController.getAll)
  .post(
    authMiddleware,
    isAdminMiddleware,
    multer({ storage: multerStorage }).single("cover"),
    articlesController.create
  );

articlesRouter.route("/:href").get(articlesController.getOne);

articlesRouter
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, articlesController.remove);

articlesRouter
  .route("/draft")
  .post(
    authMiddleware,
    isAdminMiddleware,
    multer({ storage: multerStorage }).single("ArticlesCovers"),
    articlesController.saveDraft
  );

module.exports = articlesRouter;
