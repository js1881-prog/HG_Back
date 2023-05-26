const express = require("express");
const commentController = require("../comment/commentController");
const commentRouter = express.Router();

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *           example:
 *             id: 123456789
 *             user:
 *               id: 123456789
 *               nickname: "sunny"
 *               userProfileImage: "image/16847499509811630652987056_0.jpg"
 *             trip_id: 123456789
 *             content: "Madrid is amazing city!"
 *             created_at: "2023-05-24T00:00:00Z"
 *             updated_at: "2023-05-24T00:00:00Z"
 *             likes: 0
 *             liked_by: []
 *     responses:
 *       '201':
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *             example:
 *               id: 123456789
 *               user:
 *                 id: 123456789
 *                 nickname: "sunny"
 *                 userProfileImage: "image/16847499509811630652987056_0.jpg"
 *               trip_id: 123456789
 *               content: "Madrid is amazing city!"
 *               created_at: "2023-05-24T00:00:00Z"
 *               updated_at: "2023-05-24T00:00:00Z"
 *               likes: 0
 *               liked_by: []
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */
commentRouter.post("/", commentController.createComment);

/**
 * @swagger
 * /comments/{commentId}:
 *   get:
 *     summary: Get a comment by ID
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to retrieve
 *         example: 123456789
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *             example:
 *               id: 123456789
 *               user:
 *                 id: 123456789
 *                 nickname: "sunny"
 *                 userProfileImage: "image/16847499509811630652987056_0.jpg"
 *               trip_id: 123456789
 *               content: "Madrid is amazing city!"
 *               created_at: "2023-05-24T00:00:00Z"
 *               updated_at: "2023-05-24T00:00:00Z"
 *               likes: 0
 *               liked_by: []
 *       '404':
 *         description: Comment not found
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */
commentRouter.get("/:commentId", commentController.getCommentById);

/**
 * @swagger
 * /comments/trip/{tripId}:
 *   get:
 *     summary: Get comments by trip ID
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the trip to retrieve comments
 *         example: 123456789
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *             example:
 *               - id: 123456789
 *                 user:
 *                   id: 123456789
 *                   nickname: "sunny"
 *                   userProfileImage: "image/16847499509811630652987056_0.jpg"
 *                 trip_id: 123456789
 *                 content: "Madrid is amazing city!"
 *                 created_at: "2023-05-24T00:00:00Z"
 *                 updated_at: "2023-05-24T00:00:00Z"
 *                 likes: 0
 *                 liked_by: []
 *       '404':
 *         description: Comments not found
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */
commentRouter.get("/trip/:tripId", commentController.getCommentsByTripId);

/**
 * @swagger
 * /comments/{commentId}:
 *   patch:
 *     summary: Update a comment
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to update
 *         example: 123456789
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The updated content of the comment
 *                 example: "I want to go there again!"
 *     responses:
 *       '200':
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *             example:
 *               id: 123456789
 *               user:
 *                 id: 123456789
 *                 nickname: "sunny"
 *                 userProfileImage: "image/16847499509811630652987056_0.jpg"
 *               trip_id: 123456789
 *               content: "I want to go there again!"
 *               created_at: "2023-05-24T00:00:00Z"
 *               updated_at: "2023-05-24T00:00:00Z"
 *               likes: 0
 *               liked_by: []
 *       '404':
 *         description: Comment not found
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */
commentRouter.patch("/:commentId", commentController.updateComment);

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comment]
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *             example:
 *               comments:
 *                 - id: 123456788
 *                   user:
 *                     id: 123456788
 *                     nickname: "sunny"
 *                     userProfileImage: "image/16847499509811630652987056_0.jpg"
 *                   trip_id: 123456789
 *                   content: "Madrid is amazing city!"
 *                   created_at: "2023-05-23T00:00:00Z"
 *                   updated_at: "2023-05-23T00:00:00Z"
 *                   likes: 0
 *                   liked_by: []
 *                 - id: 123456789
 *                   user:
 *                     id: 123456789
 *                     nickname: "moonlight"
 *                     userProfileImage: "image/16847499509811630652987056_0.jpg"
 *                   trip_id: 123456789
 *                   content: "Madrid is amazing city too!"
 *                   created_at: "2023-05-24T00:00:00Z"
 *                   updated_at: "2023-05-24T00:00:00Z"
 *                   likes: 0
 *                   liked_by: []
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */
commentRouter.get("/", commentController.getAllComments);

/**
 * @swagger
 * /comments/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to delete
 *         example: 123456789
 *     responses:
 *       '204':
 *         description: Comment deleted successfully
 *       '404':
 *         description: Comment not found
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */
commentRouter.delete("/:commentId", commentController.deleteComment);

module.exports = commentRouter;

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique ID of the comment
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *               description: The ID of the user who created the comment.
 *             nickname:
 *               type: string
 *               description: The nickname of the user who created the comment.
 *             userProfileImage:
 *               type: string
 *               description: The URL of the user's profile image.
 *         trip_id:
 *           type: string
 *           description: ID of the trip associated with the comment
 *         content:
 *           type: string
 *           description: The content of the comment
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time the comment was created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date and time the comment was last updated
 *         likes:
 *           type: integer
 *           description: The number of likes for the comment
 *         liked_by:
 *           type: array
 *           items:
 *            type: string
 *            description: The user IDs of users who liked the comment
 *   responses:
 *     ServerError:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 description: Error message describing the server error.
 */
