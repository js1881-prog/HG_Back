const express = require("express");
const followRouter = express.Router();
const followController = require("../follow/followController");
const extract = require("../middleware/extract");

followRouter.get(
  "/list",
  extract.bearerToken,
  extract.decodeBearerToken,
  followController.getMyFollows
);

/**
 * @swagger
 * /api/v1/follows/add:
 *   post:
 *     summary: Add a new follower to a user
 *     tags:
 *       - Follow
 *     description: 사용자를 팔로우한다. 
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
 *             targetName:
 *               type: string
 *         required: true
 *         description: The username of the user to follow.
 *     responses:
 *       200:
 *         description: Successfully followed the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: 'null'
 *                   description: Should be null in this case.
 *                 data:
 *                   type: 'null'
 *                   description: Should be null in this case.
 *       400:
 *         description: Bad Request. Invalid or missing parameters.
 *       401:
 *         description: Unauthorized. Invalid JWT token.
 *       500:
 *         description: Internal Server Error.
 */
followRouter.post(
  "/add",
  extract.bearerToken,
  extract.decodeBearerToken,
  followController.postFollow
);

/**
 * @swagger
 * /api/v1/follows/delete:
 *   delete:
 *     summary: Unfollow a user
 *     tags:
 *       - Follow
 *     description: 사용자를 언팔로우한다. 
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
 *             targetName:
 *               type: string
 *         required: true
 *         description: The username of the user to unfollow.
 *     responses:
 *       200:
 *         description: Successfully unfollowed the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: 'null'
 *                   description: Should be null in this case.
 *                 data:
 *                   type: 'null'
 *                   description: Should be null in this case.
 *       400:
 *         description: Bad Request. Invalid or missing parameters.
 *       401:
 *         description: Unauthorized. Invalid JWT token.
 *       500:
 *         description: Internal Server Error.
 */
followRouter.delete(
  "/delete",
  extract.bearerToken,
  extract.decodeBearerToken,
  followController.deleteFollow
);

module.exports = followRouter;
