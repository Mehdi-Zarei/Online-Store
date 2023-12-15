const express = require("express");
const app = express();
const corse = require("cors");
const path = require("path");
const authRouter = require("./routes/V1/auth");
const usersRouter = require("./routes/V1/users");
const categoryRouter = require("./routes/V1/category");
const courseRouter = require("./routes/V1/course");
const commentsRouter = require("./routes/V1/comment");
const contactRouter = require("./routes/V1/contact");
const newsLettersRouter = require("./routes/V1/newsLetters");
const searchRouter = require("./routes/V1/search");
const notificationsRouter = require("./routes/V1/notifications");
const offRouter = require("./routes/V1/off");
const articleRouter = require("./routes/V1/article");
const orderRouter = require("./routes/V1/order");
const ticketRouter = require("./routes/V1/ticket");
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
app.use("/v1/comments", commentsRouter);
app.use("/v1/contact", contactRouter);
app.use("/v1/newsletters", newsLettersRouter);
app.use("/v1/search", searchRouter);
app.use("/v1/notifications", notificationsRouter);
app.use("/v1/off", offRouter);
app.use("/v1/article", articleRouter);
app.use("/v1/orders", orderRouter);
app.use("/v1/tickets", ticketRouter);

module.exports = app;
