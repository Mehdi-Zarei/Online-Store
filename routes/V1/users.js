const express = require("express");
const router = express.Router();
const controller = require("../../controllers/V1/users");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");

router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, controller.getAll)
  .put(authMiddleware, controller.updateUser);

router
  .route("/:id")
  .post(authMiddleware, isAdminMiddleware, controller.banUsers)
  .delete(controller.removeUser);

router
  .route("/role")
  .put(authMiddleware, isAdminMiddleware, controller.changeUserRole);

module.exports = router;
