const express = require("express");
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");

const v1Router = express.Router();

v1Router.use("/auths", authRouter);
v1Router.use("/users", userRouter);

module.exports = {
  v1: v1Router,
};
