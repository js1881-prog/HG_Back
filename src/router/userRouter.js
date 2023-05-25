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
 *             - email
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
 *             email:
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
 *   put:
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
userRouter.put(
  "/update/profile",
  //TODO => nickname, intro Request validate
  extract.bearerToken,
  extract.decodeBearerToken,
  userController.putUpdateProfile
);

/**
 * @swagger
 * /api/v1/users/detail:
 *   get:
 *     summary: Retrieve a user's profile
 *     tags:
 *       - User
 *     description: 사용자의 프로필을 조회한다. 만약 userName이 주어지지 않으면, 토큰에 연결된 사용자의 프로필을 반환한다.
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
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             userName:
 *               type: string
 *         required: false
 *         description: The userName of the user whose profile is to be retrieved. If not provided, profile of the authenticated user is retrieved.
 *     responses:
 *       200:
 *         description: Successfully retrieved profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: 'null'
 *                   description: Should be null in this case.
 *                 data:
 *                   type: object
 *                   description: The retrieved profile information.
 *                   properties:
 *                     userEmail:
 *                       type: string
 *                       description: User's email
 *                     follows:
 *                       type: number
 *                       description: The number of users the user is following.
 *                     followers:
 *                       type: number
 *                       description: The number of users following the user.
 *                     userName:
 *                       type: string
 *                       description: User's name
 *                     userIntro:
 *                       type: string
 *                       description: User's introduction
 *       400:
 *         description: Bad Request. Invalid or missing parameters.
 *       401:
 *         description: Unauthorized. Invalid JWT token.
 *       500:
 *         description: Internal Server Error. 
 */
userRouter.get(
  "/detail",
  extract.bearerToken,
  extract.decodeBearerToken,
  userController.getProfile
);

module.exports = userRouter;
