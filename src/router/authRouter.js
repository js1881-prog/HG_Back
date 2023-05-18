const express = require("express");
const authController = require("../auth/authController");
const jwtUtils = require("../middleware/jwt/jwtUtils");
const passport = require("../middleware/passport/passport");
const extract = require("../middleware/extract");
const {
  sendVerificationPassword,
  sendVerificationCode,
  verifyEmailCode,
} = require("../middleware/mail/mailer");
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

authRouter.post(
  //TODO => email Request Validate
  "/mail/password/verify",
  sendVerificationPassword,
  authController.postChangeTemporaryPassword
);

authRouter.get(
  //TODO => email Request Validate
  "/mail/name/verify",
  sendVerificationCode,
  authController.getMailCode
);

authRouter.get(
  //TODO => emailCode Request Validate
  "/mail/verify/check",
  verifyEmailCode,
  authController.getUserName
);

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    failWithError: true,
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
    failWithError: true,
  }),
  authController.postLogin
);

// authRouter.get("/facebook", passport.authenticate("facebook"));

// authRouter.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", { failureRedirect: "/login" }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.redirect("/");
//   }
//);

// authRouter.get(
//   "/instagram",
//   passport.authenticate("instagram", {
//     scope: ['user_profile', 'user_media'],
//     session: false,
//     failWithError: true,
//   })
// );

// authRouter.get(
//   "/instagram/callback",
//   passport.authenticate("instagram", {
//     failureRedirect: "/login",
//     session: false,
//     failWithError: true,
//   }),
//   authController.postLogin
// );

module.exports = authRouter;
