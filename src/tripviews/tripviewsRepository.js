const typeORMDataSource = require("../util/connect/typeorm");
const tripviewsSchema = require("./tripviews.entity");
const logger = require("../util/logger/logger");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const repository = typeORMDataSource.getRepository(tripviewsSchema);

const tripviewsRepository = {
  async create(tripViewsData) {
    try {
      const tripviewsRepository = repository.create(tripViewsData);
      await repository.save(tripviewsRepository);
      return tripviewsRepository;
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },

  async update(tripViewId, tripViewsData) {
    try {
      const tripviewsFind = await repository.findOneBy({
        id: tripViewId,
      });

      console.log(tripViewId, tripViewsData);
      await repository.update(tripViewId, tripViewsData);
      return tripviewsFind;
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

module.exports = tripviewsRepository;
