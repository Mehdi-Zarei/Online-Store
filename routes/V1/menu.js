const express = require("express");
const menuRouter = express.Router();
const menuController = require("../../controllers/V1/menu");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");

menuRouter
  .route("/")
  .get(menuController.getAll)
  .post(authMiddleware, isAdminMiddleware, menuController.create);

menuRouter
  .route("/all")
  .get(authMiddleware, isAdminMiddleware, menuController.adminGetAll);

menuRouter
  .route("/:id/remove")
  .delete(authMiddleware, isAdminMiddleware, menuController.remove);

menuRouter
  .route("/:id/update")
  .delete(authMiddleware, isAdminMiddleware, menuController.updateMenuName);

module.exports = menuRouter;
