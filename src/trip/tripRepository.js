const typeORMDataSource = require("../util/connect/typeorm");
const tripSchema = require("./trip.entity");
const logger = require("../util/logger/logger");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const tripRepository = {
  async create(tripData) {
    try {
      const tripsRepository = await typeORMDataSource.query(
      `
      INSERT INTO trips (
        user_id, schedule_id, title, content, likes, views, location, thumbnail, started_at, end_at, hashtag, hidden
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);
      `,
        [
          tripData.user_id,
          tripData.schedule_id !== '' ? tripData.schedule_id : null,
          tripData.title,
          tripData.content,
          tripData.likes,
          tripData.views,
          tripData.location,
          tripData.thumbnail,
          tripData.started_at,
          tripData.end_at,
          tripData.hashtag,
          tripData.hidden,
        ]
      );
      return tripsRepository;
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },
};

module.exports = tripRepository;
