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
 *             type: object
 *             properties:
 *               tripId:
 *                 type: string
 *                 description: ID of the trip associated with the comment
 *               content:
 *                 type: string
 *                 description: The content of the comment
 *     responses:
 *       '201':
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
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
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       '404':
 *         description: Comment not found
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */
commentRouter.get("/:commentId", commentController.getCommentById);

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
 *     responses:
 *       '200':
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
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
 *         tripId:
 *           type: string
 *           description: ID of the trip associated with the comment
 *         content:
 *           type: string
 *           description: The content of the comment
 *         userId:
 *           type: string
 *           description: The ID of the user who created the comment
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the comment was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the comment was last updated
 *
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
