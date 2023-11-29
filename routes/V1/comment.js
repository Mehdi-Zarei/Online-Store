const express = require("express");
const commentsRouter = express.Router();
const authMiddleware = require("../../middlewares/auth");
const commentsController = require("../../controllers/V1/comment");

commentsRouter.route("/").post(authMiddleware, commentsController.create);

module.exports = commentsRouter;
