const express = require("express");
const app = express();
const corse = require("cors");
const path = require("path");
const authRouter = require("./routes/V1/auth");
app.use(express.json());
app.use(corse());
app.use(
  "/covers/corses",
  express.static(path.join(__dirname, "public", "courses", "covers"))
);
app.use("/V1/auth", authRouter);
module.exports = app;
