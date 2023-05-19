// db 검색 쿼리 생성
const typeORMDataSource = require("../util/connect/typeorm");
const Trip = require("../trip/trip.entity");

const logger = require("../util/logger/logger");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const searchRepository = {
  async search(searchText) {
    try {
      // get Trip entity's repository
      const tripRepository = typeORMDataSource.getRepository(Trip);

      const trips = await tripRepository
        .createQueryBuilder("trip") // create query builder
        .where("trip.title LIKE :searchText OR trip.content LIKE :searchText", {
          searchText: `%${searchText}%`,
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
