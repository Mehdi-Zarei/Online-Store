const express = require("express");
const offRouter = express.Router();
const offController = require("../../controllers/V1/off");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");

offRouter
  .route("/")
  .get(authMiddleware, isAdminMiddleware, offController.getAll)
  .post(authMiddleware, isAdminMiddleware, offController.create);

offRouter
  .route("/all")
  .post(authMiddleware, isAdminMiddleware, offController.setOnAll);

offRouter
  .route("/:code")
  .get(authMiddleware, isAdminMiddleware, offController.getOn)
  .delete(authMiddleware, isAdminMiddleware, offController.remove);

module.exports = offRouter;
