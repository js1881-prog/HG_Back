const typeORMDataSource = require("../util/connect/typeorm");
const scheduleSchema = require("../entities/schedule.entity");
const logger = require("../util/logger/logger");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const scheduleRepository = {
  async create(scheduleData) {
    try {
      const scheduleRepository = await typeORMDataSource.getRepository(
        scheduleSchema
      );
      const schedule = scheduleRepository.create(scheduleData);
      return await scheduleRepository.save(schedule);
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

module.exports = scheduleRepository;
