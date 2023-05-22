const express = require("express");
const tripController = require("../trip/tripController");
const extract = require("../middleware/extract");
const tripRouter = express.Router();

tripRouter.post("/", tripController.postTrip);
tripRouter.get("/detail", tripController.getTrip);
tripRouter.get("/", tripController.getTrips);
tripRouter.put("/", tripController.updateTrip);
tripRouter.delete("/", tripController.deleteTrip);

module.exports = tripRouter;