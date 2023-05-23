const express = require("express");
const tripviewsController = require("../tripviews/tripviewsController");
const extract = require("../middleware/extract");
const tripviewsRouter = express.Router();

tripviewsRouter.post("/", tripviewsController.postView);

module.exports = tripviewsRouter;