const express = require("express");
const searchRouter = express.Router();
const searchController = require("../../controllers/V1/search");

searchRouter.route("/:keyword").get(searchController.get);

module.exports = searchRouter;
