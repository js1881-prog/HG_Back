const logger = require("../util/logger/logger");
const buildResponse = require("../util/response/buildResponse");
const tripviewsService = require("./tripviewsService.js");

const tripviewsController = {
  async postView(req, res, next) {
    try {
      //const userId = req.user.id;
      const tripId = req.body.trip_id;
      const tripViewsData = {
        user_id: 3,
        trip_id: tripId,
        like_flag: true,
      };
      const tripviews = await tripviewsService.createView(tripViewsData);
      res.status(200).json(buildResponse(tripviews));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
};

module.exports = tripviewsController;
