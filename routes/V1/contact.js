const express = require("express");
const contactRouter = express.Router();
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");
const contactController = require("../../controllers/V1/contact");

contactRouter
  .route("/")
  .get(authMiddleware, isAdminMiddleware, contactController.getAll)
  .post(contactController.create);

contactRouter
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, contactController.remove);

contactRouter
  .route("/answer")
  .post(authMiddleware, isAdminMiddleware, contactController.answer);

module.exports = contactRouter;
