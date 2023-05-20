const logger = require("../util/logger/logger");
const buildResponse = require("../util/response/buildResponse");
const tripService = require("./tripService.js");

const tripController = {
  async postTrip(req, res, next) {
    try {
      //const { user_id } = req.session.user;
      const { schedule_id, title, content, location, started_at, end_at, hashtag, hidden } = req.body;
      const file  = req.file.path;

      const tripData = {
        user_id : 3,
        schedule_id,
        title,
        content,
        likes : 0,
        views : 0,
        location,
        thumbnail: file,
        started_at,
        end_at,
        hashtag,
        hidden,
      };
      console.log(tripData);

      const trip = await tripService.createTrip(tripData);
      res.status(200).json(buildResponse(null, trip));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
};

module.exports = tripController;
