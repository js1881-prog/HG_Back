const express = require("express");
const authController = require("../auth/authController");
const jwtUtils = require("../middleware/jwt/jwtUtils");
const passport = require("../middleware/passport/passport");
const extract = require("../middleware/extract");
const authRouter = express.Router();

authRouter.post(
  "/login",
  //TODO => login Request Validate
  passport.authenticate("login", { session: false, failWithError: true }),
  authController.postLogin
);

authRouter.post(
  "/logout",
  //TODO => accessToken, refreshToken Request Validate
  extract.cookieToken,
  extract.bearerToken,
  jwtUtils.deleteTokens,
  authController.postLogout
);

authRouter.get(
  "/access-tokens/verify",
  //TODO => accessToken Request Validate
  extract.bearerToken,
  jwtUtils.verifyToken,
  authController.getCheckToken
);

authRouter.get(
  "/refresh-tokens/verify",
  //TODO => refreshToken Request Validate
  extract.cookieToken,
  jwtUtils.verifyToken,
  authController.getCheckToken
);

module.exports = authRouter;