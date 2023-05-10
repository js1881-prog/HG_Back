const { EntitySchema } = require("typeorm");
const { User } = require("../user/user.entity");

class Schedule {
  constructor(schedule_id, user_id, title, start_date, end_date) {
    this.schedule_id = schedule_id;
    this.user_id = user_id;
    this.title = title;
    this.start_date = start_date;
    this.end_date = end_date;
  }
}

const ScheduleSchema = new EntitySchema({
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
  },
});

module.exports = { Schedule };
