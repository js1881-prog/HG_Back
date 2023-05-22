const express = require("express");
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const searchRouter = require("../router/searchRouter");
const commentRouter = require("../router/commentRouter");
const followRouter = require("./followRouter");

const v1Router = express.Router();

v1Router.use("/auths", authRouter);
v1Router.use("/users", userRouter);
v1Router.use("/search", searchRouter);
v1Router.use("/comment", commentRouter); // trip 본문과 합치기 전, test 용
v1Router.use("/follows", followRouter);

module.exports = {
  v1: v1Router,
};
