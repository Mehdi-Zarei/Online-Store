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

courseRouter.route("/:href").get(courseController.getOne);

courseRouter
  .route("/:id/sessions")
  .post(
    authMiddleware,
    isAdminMiddleware,
    multer({ storage: multerStorage }).single("video"),
    courseController.addSessions
  );

courseRouter
  .route("/sessions")
  .get(
    authMiddleware,
    isAdminMiddleware,
    courseController.adminGetRecentSessions
  );

courseRouter.route("/:href/:sessionID").get(courseController.getSessionInfo);

courseRouter
  .route("/sessions/:id")
  .delete(authMiddleware, isAdminMiddleware, courseController.removeSession);

courseRouter
  .route("/:id/register")
  .post(authMiddleware, courseController.register);

module.exports = courseRouter;
