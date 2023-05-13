const scheduleService = require("./scheduleService");

const ScheduleController = {
  async createSchedule(req, res) {
    try {
      const { userId, title, startDate, endDate } = req.body;
      const scheduleData = {
        userId,
        title,
        startDate,
        endDate,
      };
      const schedule = await scheduleService.createSchedule(scheduleData);
      res.status(200).json({ schedule });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ScheduleController;
