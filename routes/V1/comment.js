const express = require("express");
const commentsRouter = express.Router();
const authMiddleware = require("../../middlewares/auth");
const commentsController = require("../../controllers/V1/comment");
const isAdminMiddleware = require("../../middlewares/isAdmin");

commentsRouter
  .route("/")
  .post(authMiddleware, commentsController.create)
  .get(authMiddleware, isAdminMiddleware, commentsController.getAll);

commentsRouter
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, commentsController.remove);

commentsRouter
  .route("/:id/accept")
  .put(authMiddleware, isAdminMiddleware, commentsController.accept);

commentsRouter
  .route("/:id/reject")
  .put(authMiddleware, isAdminMiddleware, commentsController.reject);

commentsRouter
  .route("/:id/answer")
  .post(authMiddleware, isAdminMiddleware, commentsController.answer);

module.exports = commentsRouter;
