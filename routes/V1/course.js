const express = require("express");
const courseRouter = express.Router();
const multer = require("multer");
const multerStorage = require("../../utils/uploader");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");
const courseController = require("../../controllers/V1/course");

courseRouter
  .route("/")
  .post(
    multer({ storage: multerStorage }).single("cover"),
    authMiddleware,
    isAdminMiddleware,
    courseController.create
  );

courseRouter
  .route("/:id/sessions")
  .post(
    multer({ storage: multerStorage }).single("video"),
    authMiddleware,
    isAdminMiddleware,
    courseController.addSessions
  );

courseRouter
  .route("/sessions")
  .get(authMiddleware, isAdminMiddleware, courseController.getAllSessions);

courseRouter.route("/:href/:sessionID").get(courseController.getSessionInfo);

module.exports = courseRouter;
