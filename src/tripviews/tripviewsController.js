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
        like_flag: false,
      };
      const tripviews = await tripviewsService.createView(tripViewsData);
      res.status(200).json(buildResponse(tripviews));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  async updateLike(req, res, next) {
    try {
      const tripViewId = req.query.id;
      const tripId = req.body.trip_id;
      const like = req.body.like_flag;

      const tripViewsData = {
        user_id: 3,
        trip_id: tripId,
        like_flag: !like,
      };

      const tripviews = await tripviewsService.updateView(tripViewId, tripViewsData);
      res.status(200).json(buildResponse(tripviews));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
};

module.exports = tripviewsController;
