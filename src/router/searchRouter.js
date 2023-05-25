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
 *         description: The keyword to search for. For example, "madrid".
 *         required: true
 *         schema:
 *           type: string
 *         example: "madrid"
 *       - in: query
 *         name: page
 *         description: The page number to retrieve. for example, "api/v1/search?keyword=madrid&page=1"
 *         required: false
 *         schema:
 *           type: integer
 *         default: "1"
 *         example: "1"
 *       - in: query
 *         name: limit
 *         description: The number of results per page. for example, "api/v1/search?keyword=madrid&limit=20"
 *         required: false
 *         schema:
 *           type: integer
 *         default: "10"
 *         example: "20"
 *     responses:
 *       200:
 *         description: OK. Returns the matching trips.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SearchResponse'
 *             example:
 *               trips:
 *                [
 *                  {
 *                    "id": "trip1",
 *                    "title": "Trip to Madrid",
 *                    "content": "I had a wonderful time in Madrid.",
 *                    "likes": 120,
 *                    "views": 300,
 *                    "user": {
 *                      "id": "user1",
 *                      "nickname": "traveler"
 *                    }
 *                  },
 *                  {
 *                    "id": "trip2",
 *                    "title": "Another trip",
 *                    "content": "This is another trip.",
 *                    "likes": 100,
 *                    "views": 250,
 *                    "user": {
 *                      "id": "user2",
 *                      "nickname": "anotherTraveler"
 *                    }
 *                  }
 *                ]
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
 *           example: "trip1"
 *         title:
 *           type: string
 *           description: The title of the trip.
 *           example: "Trip to Madrid"
 *         content:
 *           type: string
 *           description: The content of the trip.
 *           example: "I had a wonderful time in Madrid."
 *         likes:
 *           type: integer
 *           description: The number of likes of the trip.
 *           example: 120
 *         views:
 *           type: integer
 *           description: The number of views of the trip.
 *           example: 300
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
 *           example: "traveler"
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
