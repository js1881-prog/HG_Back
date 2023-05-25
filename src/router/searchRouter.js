const express = require("express");
const searchController = require("../search/searchController");
const searchRouter = express.Router();

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
 *       - in: query
 *         name: page
 *         description: The page number to retrieve.
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         description: The number of results per page.
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK. Returns the matching trips.
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
 *         title:
 *           type: string
 *           description: The title of the trip.
 *         content:
 *           type: string
 *           description: The content of the trip.
 *         user:
 *           $ref: '#/components/schemas/User'
 *           description: The user who posted the trip.
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The ID of the user.
 *         nickname:
 *           type: string
 *           description: The nickname of the user.
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
searchRouter.get("/", searchController.getSearch);

module.exports = searchRouter;
