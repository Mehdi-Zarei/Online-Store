const express = require("express");
const commentsRouter = express.Router();
const authMiddleware = require("../../middlewares/auth");
const commentsController = require("../../controllers/V1/comment");
const isAdminMiddleware = require("../../middlewares/isAdmin");

commentsRouter.route("/").post(authMiddleware, commentsController.create);

commentsRouter
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, commentsController.remove);

module.exports = commentsRouter;
