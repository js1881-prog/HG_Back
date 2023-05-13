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

  async update(scheduleId, scheduleData) {
    try {
      const scheduleRepository = await typeORMDataSource.getRepository(
        scheduleSchema
      );
      const existingSchedule = await scheduleRepository.findOne(scheduleId);
      if (!existingSchedule) {
        throw new AppError(commonErrors.notFound, 404, "Schedule not found");
      }
      const updatedSchedule = Object.assign(existingSchedule, scheduleData);
      return await scheduleRepository.save(updatedSchedule);
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },

  async delete(scheduleId) {
    try {
      const scheduleRepository = await typeORMDataSource.getRepository(
        scheduleSchema
      );
      const existingSchedule = await scheduleRepository.findOne(scheduleId);
      if (!existingSchedule) {
        throw new AppError(commonErrors.notFound, 404, "Schedule not found");
      }
      await scheduleRepository.remove(existingSchedule);
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },

  async findById(scheduleId) {
    try {
      const scheduleRepository = await typeORMDataSource.getRepository(
        scheduleSchema
      );
      const schedule = await scheduleRepository.findOne(scheduleId, {
        relations: ["user"],
      });
      return schedule;
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },

  async findAll() {
    try {
      const scheduleRepository = await typeORMDataSource.getRepository(
        scheduleSchema
      );
      const schedules = await scheduleRepository.find({ relations: ["user"] });
      return schedules;
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
