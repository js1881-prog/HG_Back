const { EntitySchema } = require("typeorm");
const { UserSchema } = require("../user/user.entity");

class Schedule {
  schedule_id;
  user_id;
  title;
  start_date;
  end_date;
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
      target: () => UserSchema,
      joinColumn: { name: "user_id" },
    },
  },
});

module.exports = { Schedule, ScheduleSchema };
