const express = require("express");
const router = express.Router();
const controller = require("../../controllers/V1/users");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");

router.route("/").get(authMiddleware, isAdminMiddleware, controller.getAll);

router
  .route("/:id")
  .post(authMiddleware, isAdminMiddleware, controller.banUsers)
  .delete(controller.removeUser);

module.exports = router;
