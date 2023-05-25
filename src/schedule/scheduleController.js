const scheduleService = require("./scheduleService");
const logger = require("../util/logger/logger");

const ScheduleController = {
  async createSchedule(req, res, next) {
    try {
      const { user_id, title, start_date, end_date } = req.body;
      const scheduleData = {
        user_id,
        title,
        start_date,
        end_date,
      };
      const schedule = await scheduleService.createSchedule(scheduleData);
      res.status(200).json({ schedule });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  async updateSchedule(req, res, next) {
    try {
      const { scheduleId } = req.params;
      const { title, startDate, endDate } = req.body;
      const scheduleData = {
        title,
        startDate,
        endDate,
      };
      const updatedSchedule = await scheduleService.updateSchedule(
        scheduleId,
        scheduleData
      );
      res.status(200).json({ schedule: updatedSchedule });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  async deleteSchedule(req, res) {
    try {
      const { scheduleId } = req.params;
      await scheduleService.deleteSchedule(scheduleId);
      res.status(200).json({ message: "Schedule deleted successfully" });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  async getSchedule(req, res, next) {
    try {
      const { scheduleId } = req.params;
      const schedule = await scheduleService.getSchedule(scheduleId);
      if (!schedule) {
        return res.status(404).json({ error: "Schedule not found" });
      }
      res.status(200).json(schedule);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  async getAllSchedules(req, res) {
    try {
      const schedules = await scheduleService.getAllSchedules();
      res.status(200).json(schedules);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
};

module.exports = ScheduleController;
