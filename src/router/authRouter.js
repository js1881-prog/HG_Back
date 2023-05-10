const express = require("express");
const authController = require("../auth/authController");
const { verifytokenInRedis } = require("../middleware/jwt/jwtUtils");
const passport = require("../middleware/passport/passport");
const extractTokenFromBearerToken = require("../middleware/tokenExtractor");
const authRouter = express.Router();

authRouter.post(
  //TODO => login Request Validate
  "/login",
  passport.authenticate("login", { session: false, failWithError: true }),
  authController.postLogin
);

authRouter.get(
  //TODO => token Request Validate
  "/check",
  extractTokenFromBearerToken,
  verifytokenInRedis,
  authController.getValidateAccessToken
);

authRouter.get("/check-re");

module.exports = authRouter;
