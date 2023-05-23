const express = require("express");
const searchController = require("../search/searchController");
const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: API for searching trips and users
 */

/**
 * @swagger
 * /api/v1/search:
 *   get:
 *     summary: Search trips and users by keyword
 *     tags: [Search]
 *     description: Retrieve a list of trips and users that match the provided keyword.
 *     parameters:
 *       - in: query
 *         name: keyword
 *         description: The keyword to search for.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK. Returns the matching trips and users.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SearchResponse'
 *       400:
 *         description: Bad Request. Invalid or missing keyword.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error. Failed to perform the search.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SearchResponse:
 *       type: object
 *       properties:
 *         trips:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Trip'
 *           description: An array of trips matching the search keyword.
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *           description: An array of users matching the search keyword.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Trip:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The ID of the trip.
 *         name:
 *           type: string
 *           description: The name of the trip.
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: The start date of the trip.
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: The end date of the trip.
 *         location:
 *           type: string
 *           description: The location of the trip.
 *
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The ID of the user.
 *         nickName:
 *           type: string
 *           description: The name of the user.
 */

/**
 * @swagger
 * components:
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

/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: The error message describing the issue.
 */
userRouter.get("/", searchController.getSearch);

module.exports = userRouter;
