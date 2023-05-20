const express = require("express");
const userController = require("../user/userController");
const jwtUtils = require("../middleware/jwt/jwtUtils");
const passport = require("../middleware/passport/passport");
const extract = require("../middleware/extract");
const userRouter = express.Router();

userRouter.post(
  "/signup",
  //TODO => signup Request validate
  userController.postSignup
);

userRouter.post(
  "/update/profile",
  //TODO => nickname, intro Request validate
  extract.bearerToken,
  extract.decodeBearerToken,
  userController.postUpdateProfile
);

module.exports = userRouter;
