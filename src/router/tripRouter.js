const express = require("express");
const tripController = require("../trip/tripController");
const extract = require("../middleware/extract");
const tripRouter = express.Router();

//tripRouter.post("/", upload.single('thumbnail'), tripController.postTrip);
tripRouter.post("/", tripController.postTrip);
tripRouter.get("/detail", tripController.getTrip);
tripRouter.get("/", tripController.getTrips);
tripRouter.put("/", tripController.updateTrip);

module.exports = tripRouter;