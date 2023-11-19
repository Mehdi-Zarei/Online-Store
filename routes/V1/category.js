const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/V1/category");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");

router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, categoryController.getAll)
  .post(authMiddleware, isAdminMiddleware, categoryController.create);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, categoryController.remove)
  .put(authMiddleware, isAdminMiddleware, categoryController.update);

module.exports = router;
