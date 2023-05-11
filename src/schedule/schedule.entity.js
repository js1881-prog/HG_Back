const { EntitySchema } = require("typeorm");
const { User } = require("../user/user.entity");
const { Trip } = require("../trip/trip.entity");

class Schedule {
  constructor(ScheduleId, userId, title, startDate, endDate) {
    this.schedule_id = ScheduleId;
    this.user_id = userId;
    this.title = title;
    this.start_date = startDate;
    this.end_date = endDate;
  }
}

const scheduleSchema = new EntitySchema({
  name: "Schedule",
  tableName: "Schedule",
  columns: {
    schedule_id: {
      type: "bigint",
      primary: true,
      generated: true,
    },
    user_id: {
      type: "bigint",
    },
    title: {
      type: "varchar",
      length: 100,
      nullable: true,
    },
    start_date: {
      type: "date",
      nullable: false,
    },
    end_date: {
      type: "date",
      nullable: false,
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: () => User,
      joinColumn: { name: "user_id" },
    },
    trip: {
      type: "one-to-many",
      target: () => Trip,
      inverseSide: "schedule",
      joinColumn: { name: "schedule_id" },
      cascade: true,
    },
  },
});

module.exports = { Schedule, scheduleSchema };
