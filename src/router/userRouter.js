const express = require("express");
const userController = require("../user/userController");
const jwtUtils = require("../middleware/jwt/jwtUtils");
const passport = require("../middleware/passport/passport");
const extract = require("../middleware/extract");
const userRouter = express.Router();

/**
 * @swagger
 * /api/v1/users/signup:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - User
 *     description: 새로운 사용자를 등록한다. 사용자 정보는 request body로부터 받아온다.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user's registration information.
 *         schema:
 *           type: object
 *           required:
 *             - nickName
 *             - userName
 *             - password
 *             - role
 *             - phoneNumber
 *             - email
 *             - intro
 *           properties:
 *             nickName:
 *               type: string
 *             userName:
 *               type: string
 *             password:
 *               type: string
 *             role:
 *               type: string
 *               example: user
 *             phoneNumber:
 *               type: string
 *             email:
 *               type: string
 *             intro:
 *               type: string
 *     responses:
 *       200:
 *         description: Successfully registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: null
 *                   description: Should be null in this case.
 *                   example: null
 *                 data:
 *                   type: null
 *                   description: Should be null in this case.
 *                   example: null
 *       400:
 *         description: Bad Request. Invalid or missing parameters.
 *       500:
 *         description: Internal Server Error. 
 */
userRouter.post(
  "/signup",
  //TODO => signup Request validate
  userController.postSignup
);

/**
 * @swagger
 * /api/v1/users/update/profile:
 *   post:
 *     summary: Update a user's profile
 *     tags:
 *       - User
 *     description: 사용자의 프로필을 수정한다. 수정할 정보는 request body에서 받아온다.
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
 *       - in: body
 *         name: profile
 *         description: The updated profile information.
 *         schema:
 *           type: object
 *           required:
 *             - nickName
 *             - intro
 *           properties:
 *             nickName:
 *               type: string
 *             intro:
 *               type: string
 *     responses:
 *       200:
 *         description: Successfully updated profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: null
 *                   description: Should be null in this case.
 * 
 *                 data:
 *                   type: null
 *                   description: Should be null in this case.
 *       400:
 *         description: Bad Request. Invalid or missing parameters.
 *       401:
 *         description: Unauthorized. Invalid JWT token.
 *       500:
 *         description: Internal Server Error. 
 */
userRouter.post(
  "/update/profile",
  //TODO => nickname, intro Request validate
  extract.bearerToken,
  extract.decodeBearerToken,
  userController.postUpdateProfile
);

userRouter.get(
  "/detail",
  extract.bearerToken,
  extract.decodeBearerToken,
  userController.getProfile
);

module.exports = userRouter;
