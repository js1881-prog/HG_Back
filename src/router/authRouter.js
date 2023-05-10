const express = require("express");
const authController = require("../auth/authController");
const passport = require("../middleware/passport/passport");

const authRouter = express.Router();

authRouter.post(
  "/login",
  passport.authenticate("login", { session: false, failWithError: true }),
  authController.postLogin
);

module.exports = authRouter;
