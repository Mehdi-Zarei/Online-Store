const express = require("express");
const app = express();
const corse = require("cors");
const path = require("path");
const authRouter = require("./routes/V1/auth");
const usersRouter = require("./routes/V1/users");
const categoryRouter = require("./routes/V1/category");
const courseRouter = require("./routes/V1/course");
app.use(express.json());
app.use(corse());
app.use(
  "/covers/corses",
  express.static(path.join(__dirname, "public", "courses", "covers"))
);
app.use("/v1/auth", authRouter);
app.use("/v1/users", usersRouter);
app.use("/v1/users/ban", usersRouter);
app.use("/v1/category", categoryRouter);
app.use("/v1/course", courseRouter);

module.exports = app;
