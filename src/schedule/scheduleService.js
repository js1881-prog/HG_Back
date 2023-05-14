const scheduleRepository = require("./scheduleRepository");

const ScheduleService = {
  async createSchedule(scheduleData) {
    const schedule = await scheduleRepository.create(scheduleData);
    return schedule;
  },

  async updateSchedule(scheduleId, scheduleData) {
    const updatedSchedule = await scheduleRepository.update(
      scheduleId,
      scheduleData
    );
    return updatedSchedule;
  },

  async deleteSchedule(scheduleId) {
    await scheduleRepository.delete(scheduleId);
  },

  async getSchedule(scheduleId) {
    const schedule = await scheduleRepository.findById(scheduleId);
    return schedule;
  },

  async getAllSchedules() {
    const schedules = await scheduleRepository.findAll();
    return schedules;
  },
};

module.exports = ScheduleService;
