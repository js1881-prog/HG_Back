const typeORMDataSource = require("../util/connect/typeorm");
const tripSchema = require("./trip.entity");
const logger = require("../util/logger/logger");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const repository = typeORMDataSource.getRepository(tripSchema);

const tripRepository = {
  async create(tripData) {
    try {
      const tripRepository = repository.create(tripData);
      await repository.save(tripRepository);
      return tripRepository;
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },

  async findTripById(tripId) {
    try {
      const result = repository.findOneBy({
        id: tripId,
      });
      return result;
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },

  async findTripAll() {
    try {
      const result = repository.find();
      return result;
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },

  async update(tripId, tripData) {
    try {
      console.log(tripId);
      const tripFind = await repository.findOneBy({
        id: tripId,
      });

      await repository.update(tripId, tripData);
      return tripFind;
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },

  async delete(tripId) {
    try {
      const result = repository.delete(tripId);
      return result;
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
