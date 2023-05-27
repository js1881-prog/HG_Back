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

/**
 * @swagger
 * /api/v1/auths/login:
 *   post:
 *     summary: 
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: 로그인 정보
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: 사용자 이름
 *               password:
 *                 type: string
 *                 description: 비밀번호
 *     responses:
 *       200:
 *         description:
 *          accessToken => Authorization Bearer //
 *          refreshToken => HttpOnlyCookie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginSuccessResponse'
 *       401:
 *         description: Fail
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'

 * components:
 *   schemas:
 *     LoginSuccessResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: 성공 여부 (에러 메시지가 없을 경우 null)
 *           example: null
 *         data:
 *           type: string
 *           description: 에러 데이터 (에러가 없을 경우 null)
 *           example: null
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: 에러 메시지
 *           example: "Any Error Message"
 *         data:
 *           type: string
 *           description: 에러 데이터 (에러가 없을 경우 null)
 *           example: null
 */
authRouter.post(
  "/login",
  //TODO => login Request Validate
  passport.authenticate("login", { session: false, failWithError: true }),
  authController.postLogin
);



/**
 * @swagger
 * /api/v1/auths/logout:
 *   post:
 *     summary: Logs out a user by deleting tokens and clearing the refreshToken cookie
 *     tags:
 *       - Authentication
 *     description: 로그아웃, httpOnlyCookie와 redis상의 jwt를 제거한다.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           format: bearer
 *         required: true
 *         description: The JWT token of the authenticated user.
 *       - in: cookie
 *         name: refreshToken
 *         schema:
 *           type: string
 *         required: true
 *         description: The refreshToken of the authenticated user.
 *     responses:
 *       200:
 *         description: Successfully logged out.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: 'null'
 *               description: Should be null in this case.
 *             data:
 *               type: 'null'
 *               description: Should be null in this case.
 *       400:
 *         description: Bad Request. Invalid or missing parameters.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: The error message for this situation.
 *             data:
 *               type: 'null'
 *               description: Should be null in this case.
 *       401:
 *         description: Unauthorized. Invalid JWT token or refreshToken.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: The error message for this situation.
 *             data:
 *               type: 'null'
 *               description: Should be null in this case.
 *       500:
 *         description: Internal Server Error. 
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: The error message for this situation.
 *             data:
 *               type: 'null'
 *               description: Should be null in this case.
 */
authRouter.post(
  "/logout",
  //TODO => accessToken, refreshToken Request Validate
  extract.cookieToken,
  extract.bearerToken,
  jwtUtils.deleteTokens,
  authController.postLogout
);


/**
 * @swagger
 * /api/v1/auths/access-tokens/verify:
 *   get:
 *     summary: 액세스 토큰 유효성 검증
 *     tags:
 *       - Authentication
 *     description: 주어진 액세스 토큰의 유효성을 검증한다.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           format: bearer
 *         required: true
 *         description: 유효성을 검증할 액세스 토큰
 *
 *     responses:
 *       200:
 *         description: Access token is valid.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: 'null'
 *               description: Should be null if no error occurs.
 *             data:
 *               type: 'null'
 *               description: Data is null in this case.
 *       400:
 *         description: Bad Request. Invalid or missing parameters.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: The error message for this situation.
 *             data:
 *               type: 'null'
 *               description: Data is null in this case.
 *       401:
 *         description: Unauthorized. Invalid access token.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: The error message for this situation.
 *             data:
 *               type: 'null'
 *               description: Data is null in this case.
 *       500:
 *         description: Internal Server Error.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: The error message for this situation.
 *             data:
 *               type: 'null'
 *               description: Data is null in this case.
 */
authRouter.get(
  "/access-tokens/verify",
  //TODO => accessToken Request Validate
  extract.bearerToken,
  jwtUtils.verifyToken,
  authController.getCheckToken
);

/**
 * @swagger
 * /api/v1/auths/refresh-tokens/verify:
 *   get:
 *     summary: Verifies the validity of a given refresh token
 *     tags:
 *       - Authentication
 *     description: Verifies the validity of the provided refresh token.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: cookie
 *         name: refreshToken
 *         schema:
 *           type: string
 *         required: true
 *         description: The refresh token to verify.
 *     responses:
 *       200:
 *         description: Refresh token is valid.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: 'null'
 *               description: Should be null if no error occurs.
 *             data:
 *               type: 'null'
 *               description: Data is null in this case.
 *       400:
 *         description: Bad Request. Invalid or missing parameters.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: The error message for this situation.
 *             data:
 *               type: 'null'
 *               description: Data is null in this case.
 *       401:
 *         description: Unauthorized. Invalid refresh token.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: The error message for this situation.
 *             data:
 *               type: 'null'
 *               description: Data is null in this case.
 *       500:
 *         description: Internal Server Error.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: The error message for this situation.
 *             data:
 *               type: 'null'
 *               description: Data is null in this case.
 */
authRouter.get(
  "/refresh-tokens/verify",
  //TODO => refreshToken Request Validate
  extract.cookieToken,
  jwtUtils.verifyToken,
  authController.getCheckTokenAndReissue
);

/**
 * @swagger
 * /api/v1/auths/mail/password/verify:
 *   post:
 *     summary: Sends a temporary password via email and updates the user's password
 *     tags:
 *       - Authentication
 *     description: 임시 비밀번호를 이메일로 전송하고 해당 임시 비밀번호로 사용자의 비밀번호를 변경한다.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *
 *     parameters:
 *       - in: body
 *         name: Body
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *         required: true
 *         description: The email of the user who forgot their password.
 *
 *
 *     responses:
 *       200:
 *         description: Password was successfully changed.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: 'null'
 *               description: 에러가 발생하지 않았다면 null.
 *             data:
 *               type: 'null'
 *               description: Data is null in this case.
 *       400:
 *         description: Bad Request. Invalid or missing parameters.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: The error message for this situation.
 *             data:
 *               type: 'null'
 *               description: Data is null in this case.
 *       401:
 *         description: Unauthorized. Invalid email.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: The error message for this situation.
 *             data:
 *               type: 'null'
 *               description: Data is null in this case.
 *       500:
 *         description: Internal Server Error.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: The error message for this situation.
 *             data:
 *               type: 'null'
 *               description: Data is null in this case.
 */
authRouter.post(
  //TODO => email Request Validate
  "/mail/password/verify",
  sendVerificationPassword,
  authController.postReplacePassword
);

/**
 * @swagger
 * /api/v1/auths/mail/name/verify:
 *   get:
 *     summary: Sends a verification code via email
 *     tags:
 *       - Authentication
 *     description: 사용자의 이메일로 인증 코드를 보낸다.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *         required: true
 *         description: Verification code will be sent to this email.
 *     responses:
 *       200:
 *         description: Verification code was successfully sent.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: 'null'
 *               description: 에러가 발생하지 않았다면 null.
 *             data:
 *               type: 'null'
 *               description: Data is null in this case.
 *       400:
 *         description: Bad Request. Invalid or missing parameters.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: The error message for this situation.
 *             data:
 *               type: 'null'
 *               description: Data is null in this case.
 *       401:
 *         description: Unauthorized. Invalid email.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: The error message for this situation.
 *             data:
 *               type: 'null'
 *               description: Data is null in this case.
 *       500:
 *         description: Internal Server Error.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: The error message for this situation.
 *             data:
 *               type: 'null'
 *               description: Data is null in this case.
 */
authRouter.get(
  //TODO => email Request Validate
  "/mail/name/verify",
  sendVerificationCode,
  authController.getMailCode
);

/**
 * @swagger
 * /api/v1/auths/mail/verify/check:
 *   get:
 *     summary: Verify the email code and return the user's name
 *     tags:
 *       - Authentication
 *     description: 이메일 코드를 검증하고, 성공하면 해당 이메일의 사용자 이름을 반환한다.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: string
 *         required: true
 *         description: The code to verify the email.
 *     responses:
 *       200:
 *         description: Successfully verified the email code and returned the user's name.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 에러가 발생하지 않았다면 null.
 *                   example: null
 *                 data:
 *                   type: object
 *                   description: The username associated with the email.
 *                   example: { userName: string }
 *       400:
 *         description: Bad Request. Invalid or missing parameters.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: The error message for this situation.
 *             data:
 *               type: 'null'
 *               description: Data is null in this case.
 *       401:
 *         description: Unauthorized. Invalid code.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: The error message for this situation.
 *             data:
 *               type: 'null'
 *               description: Data is null in this case.
 *       500:
 *         description: Internal Server Error.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: The error message for this situation.
 *             data:
 *               type: 'null'
 *               description: Data is null in this case.
 */
authRouter.get(
  //TODO => emailCode Request Validate
  "/mail/verify/check",
  verifyEmailCode,
  authController.getUserName
);

/**
 * @swagger
 * /api/v1/auths/google:
 *   get:
 *     summary: Initiates Google authentication flow
 *     tags:
 *       - Authentication
 *     description: Google로부터 사용자 프로필과 이메일에 대한 접근 권한을 요청하고, 인증 과정을 시작한다.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully initiated the Google authentication process.
 *       401:
 *         description: Unauthorized. User denied the access to their Google account.
 *       500:
 *         description: Internal Server Error.
 */
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    failWithError: true,
  })
);

/**
 * @swagger
 * /api/v1/auths/google/callback:
 *   get:
 *     summary: Handles the callback from the Google authentication flow
 *     tags:
 *       - Authentication
 *     description: Google로부터의 callback을 처리하며, 인증에 실패하면 '/login' 페이지로 리다이렉트한다. 성공적인 인증 후에는 accessToken과 refreshToken이 생성되며, 이들은 각각 Authorization 헤더와 httpOnly 쿠키로 클라이언트에게 전달된다.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully authenticated and returned the tokens.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: null
 *                   description: 에러가 발생하지 않았다면 null.
 *                 data:
 *                   type: null
 *                   description: 이 경우 data는 null이다.
 *       401:
 *         description: Unauthorized. The Google authentication process failed.
 *       500:
 *         description: Internal Server Error.
 */
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
