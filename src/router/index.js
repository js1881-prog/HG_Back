const express = require("express");
const authRouter = require("./authRouter");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */
const v1Router = express.Router();

v1Router.use("/auths", authRouter);

module.exports = {
  v1: v1Router,
};