const typeORMDataSource = require("../util/connect/typeorm");
const User = require("../user/user.entity");
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
  async search(keyword) {
    try {
      const trips = await tripRepository
        .createQueryBuilder("trips")
        .innerJoin("trips.user", "user", "1 = 1")
        .where("trips.title LIKE :keyword", {
          keyword: `%${keyword}%`,
        })
        .orWhere(" trips.content LIKE :keyword", {
          keyword: `%${keyword}%`,
        })
        .orWhere("user.nickname LIKE :keyword", {
          keyword: `%${keyword}%`,
        })
        .orWhere("user.user_name LIKE :keyword", {
          keyword: `%${keyword}%`,
        })
        .getMany();

      return trips;
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

module.exports = searchRepository;
