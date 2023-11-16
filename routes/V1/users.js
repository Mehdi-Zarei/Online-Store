const express = require("express");
const router = express.Router();
const controller = require("../../controllers/V1/banUsers");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");

router
  .route("/:id")
  .post(authMiddleware, isAdminMiddleware, controller.banUsers);

module.exports = router;
