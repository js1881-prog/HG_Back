const { EntitySchema } = require("typeorm");
const User = require("../user/User");
const Schedule = require("./Schedule");

const scheduleSchema = new EntitySchema({
  name: "Schedule",
  tableName: "schedules",
  columns: {
    id: {
      primary: true,
      type: "bigint",
      generated: "increment",
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
    created_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    updated_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: () => User,
      joinColumn: { name: "user_id" },
    },
  },
  target: Schedule,
});

module.exports = scheduleSchema;
