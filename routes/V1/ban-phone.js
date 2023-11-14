const express = require("express");
const router = express.Router();
const controller = require("../../controllers/V1/ban-users");

router.route("/:id").post(controller.banUsers);

module.exports = router;
