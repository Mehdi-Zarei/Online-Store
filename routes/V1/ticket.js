const express = require("express");
const ticketRouter = express.Router();
const ticketsController = require("../../controllers/V1/ticket");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");

ticketRouter
  .route("/department/create")
  .post(authMiddleware, isAdminMiddleware, ticketsController.createDepartments);

ticketRouter
  .route("/department-sub/create")
  .post(
    authMiddleware,
    isAdminMiddleware,
    ticketsController.createDepartmentSub
  );

ticketRouter
  .route("/")
  .get(authMiddleware, isAdminMiddleware, ticketsController.getAll)
  .post(authMiddleware, ticketsController.create);

ticketRouter
  .route("/user-tickets")
  .get(authMiddleware, ticketsController.userTickets);

ticketRouter.route("/department").get(ticketsController.departments);

ticketRouter
  .route("/department/:id/subs")
  .get(ticketsController.departmentsSub);

ticketRouter
  .route("/answer")
  .post(authMiddleware, isAdminMiddleware, ticketsController.setAnswer);

ticketRouter
  .route("/:id/answer")
  .get(authMiddleware, ticketsController.getAnswer);

ticketRouter
  .route("/:id/remove")
  .delete(authMiddleware, isAdminMiddleware, ticketsController.remove);

module.exports = ticketRouter;
