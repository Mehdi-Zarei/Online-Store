const express = require("express");
const notificationsRouter = express.Router();
const notificationsController = require("../../controllers/V1/notifications");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");

notificationsRouter
  .route("/")
  .post(authMiddleware, isAdminMiddleware, notificationsController.create)
  .get(authMiddleware, isAdminMiddleware, notificationsController.getAll);

notificationsRouter
  .route("/adminsID")
  .get(authMiddleware, isAdminMiddleware, notificationsController.get);

notificationsRouter
  .route("/:id/seen")
  .put(authMiddleware, isAdminMiddleware, notificationsController.seen);

notificationsRouter.route("/:id").delete(notificationsController.remove);

module.exports = notificationsRouter;
