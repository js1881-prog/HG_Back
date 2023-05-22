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
 *     tags: [Search]
 *     summary: Search trips and users by keyword
 *     description: Retrieve a list of trips that match the provided keyword.
 *     parameters:
 *       - in: query
 *         name: keyword
 *         description: The keyword to search for.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation. Returns the matching trips.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trips:
 *                   type: array
 *                 users:
 *                   type: array
 *       500:
 *         description: Internal Server Error. Something went wrong during the search.
 *         content:
 *           application/json:
 */

userRouter.get("/", searchController.getSearch);

module.exports = userRouter;
