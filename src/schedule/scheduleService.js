const scheduleRepository = require("./scheduleRepository");

const ScheduleService = {
  async createSchedule(scheduleData) {
    const schedule = await scheduleRepository.create(scheduleData);
    return schedule;
  },
};

module.exports = ScheduleService;
