const express = require("express");
const authRouter = require("./authRouter");
const tripRouter = require("./tripRouter");
const imageRouter = require("./imageRouter");

const v1Router = express.Router();

v1Router.use("/auths", authRouter);
v1Router.use("/trip", tripRouter);
v1Router.use("/images", imageRouter);

module.exports = {
  v1: v1Router,
};
