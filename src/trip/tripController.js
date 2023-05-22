const logger = require("../util/logger/logger");
const buildResponse = require("../util/response/buildResponse");
const tripService = require("./tripService.js");

const tripController = {
  async postTrip(req, res, next) {
    try {
      //const { user_id } = req.user.id;
      const { schedule_id, title, content, location, thumbnail, started_at, end_at, hashtag, hidden } = req.body;

      const tripData = {
        user_id : 3,
        schedule_id,
        title,
        content,
        likes : 0,
        views : 0,
        location,
        thumbnail,
        started_at,
        end_at,
        hashtag,
        hidden,
      };
      console.log(tripData);

      const trip = await tripService.createTrip(tripData);

      console.log(trip);
      res.status(200).json(buildResponse(trip, null));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  async getTrip(req, res, next) {
    try {
      const tripId = req.query.id;
      const trip = await tripService.getTrip(tripId);
      res.status(200).json(buildResponse(null, trip));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  async getTrips(req, res, next) {
    try {
      const trip = await tripService.getAllTrips();
      res.status(200).json(buildResponse(null, trip));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  
  async updateTrip(req, res, next) {
    try {
      const tripId = req.query.id;
      const { schedule_id, title, content, location, thumbnail, started_at, end_at, hashtag, hidden } = req.body;
      //const { user_id } = req.user.id;
      const tripData = {
        user_id : 3,
        schedule_id,
        title,
        content,
        location,
        thumbnail,
        started_at,
        end_at,
        hashtag,
        hidden,
      };
      const trip = await tripService.updateTrip(tripId, tripData);
      res.status(200).json(buildResponse(null, trip));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

};

module.exports = tripController;
