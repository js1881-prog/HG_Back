const express = require("express");
const authRouter = require("./authRouter");
const tripRouter = require("./tripRouter");
const imageRouter = require("./imageRouter");
const userRouter = require("./userRouter");
const searchRouter = require("../router/searchRouter");
const commentRouter = require("../router/commentRouter");
const scheduleRouter = require("../router/scheduleRouter");

const v1Router = express.Router();

v1Router.use("/auths", authRouter);
v1Router.use("/trip", tripRouter);
v1Router.use("/images", imageRouter);
v1Router.use("/users", userRouter);
v1Router.use("/search", searchRouter);
v1Router.use("/comment", commentRouter); // trip 본문과 합치기 전, test 용
v1Router.use("/schedule", scheduleRouter);

module.exports = {
  v1: v1Router,
};
