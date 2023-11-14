const express = require("express");
const authRouter = express.Router();
const authController = require("../../controllers/V1/auth");

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/me", authController.getMe);

module.exports = authRouter;
