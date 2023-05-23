const logger = require("../util/logger/logger");
const buildResponse = require("../util/response/buildResponse");
const tripService = require("./tripService.js");

const tripController = {
  async postTrip(req, res, next) {
    try {
      //const userId = req.user.id;
      const { schedule_id, title, content, location, thumbnail, gps, started_at, end_at, hashtag, hidden } = req.body;
      const tripData = {
        // user_id : userId,
        user_id : 3,
        schedule_id,
        title,
        content,
        likes : 0,
        views : 0,
        location,
        thumbnail,
        gps,
        started_at,
        end_at,
        hashtag,
        hidden,
      };
      console.log(tripData);

      const trip = await tripService.createTrip(tripData);
      res.status(200).json(buildResponse(trip, null));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  async getTrip(req, res, next) {
    try {
      const tripId = req.query.id;
      const trip = await tripService.getTripById(tripId);
      res.status(200).json(buildResponse(trip, null));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  async getTrips(req, res, next) {
    try {
      const trip = await tripService.getAllTrips();
      res.status(200).json(buildResponse(trip, null));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  
  async updateTrip(req, res, next) {
    try {
      const tripId = req.query.id;
      const { schedule_id, title, content, location, thumbnail, gps, started_at, end_at, hashtag, hidden } = req.body;
      //const userId = req.user.id;
      const tripData = {
        //user_id : userId,
        user_id : 3,
        schedule_id,
        title,
        content,
        location,
        thumbnail,
        gps,
        started_at,
        end_at,
        updated_at : new Date(),
        hashtag,
        hidden,
      };
      const trip = await tripService.updateTrip(tripId, tripData);
      res.status(200).json(buildResponse(trip, null));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  async deleteTrip(req, res, next) {
    try {
      const tripId = req.query.id;
      const trip = await tripService.deleteTrip(tripId);
      res.status(200).json(buildResponse(trip, null));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

};

module.exports = tripController;
