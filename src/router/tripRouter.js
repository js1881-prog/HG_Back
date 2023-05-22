const express = require("express");
const tripController = require("../trip/tripController");
const extract = require("../middleware/extract");
const tripRouter = express.Router();

//tripRouter.post("/", upload.single('thumbnail'), tripController.postTrip);
tripRouter.post("/", tripController.postTrip);
//tripRouter.get("/", tripController.postTrip);

module.exports = tripRouter;