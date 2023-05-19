const express = require("express");
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const searchRouter = require("./searchRouter");
const commentRouter = require("./commentRouter");

const v1Router = express.Router();

v1Router.use("/auths", authRouter);
v1Router.use("/users", userRouter);
v1Router.use("/search", searchRouter);
v1Router.use("/comment", commentRouter); // trip 본문과 합치기 전, test 용

module.exports = {
  v1: v1Router,
};
