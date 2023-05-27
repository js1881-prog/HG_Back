const typeORMDataSource = require("../util/connect/typeorm");
const Trip = require("../trip/trip.entity");

const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const logger = require("../util/logger/logger");

const tripRepository = typeORMDataSource.getRepository(Trip);

const searchRepository = {
  /**
   * Search trips by keyword.
   * @param {string} keyword - The keyword to search for.
   * @returns {Array<Trip>} The matching trips.
   */
  async search(keyword, page = 1, limit = 10) {
    try {
      const trips = await tripRepository
        .createQueryBuilder("trips")
        .leftJoinAndSelect("trips.user", "user")
        .where("trips.title LIKE :keyword", {
          keyword: `%${keyword}%`,
        })
        .orWhere(" trips.content LIKE :keyword", {
          keyword: `%${keyword}%`,
        })
        .orWhere("user.nickname LIKE :keyword", {
          keyword: `%${keyword}%`,
        })
        .orderBy("trips.likes", "DESC")
        .addOrderBy("trips.views", "DESC")
        .skip((page - 1) * limit)
        .take(limit)
        .getMany();

      return trips;
    } catch (error) {
      logger.info(error);
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError(
          commonErrors.databaseError,
          500,
          "Internal Server Error"
        );
      }
    }
  },
};

module.exports = searchRepository;
