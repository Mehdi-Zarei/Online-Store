const express = require("express");
const orderRouter = express.Router();
const authMiddleware = require("../../middlewares/auth");
const orderController = require("../../controllers/V1/order");

orderRouter.route("/").get(authMiddleware, orderController.getAll);
orderRouter.route("/:id").get(authMiddleware, orderController.getOne);

module.exports = orderRouter;
