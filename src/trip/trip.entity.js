const { EntitySchema } = require("typeorm");
const Schedule = require("../schedule/Schedule");
const User = require("../user/User");
const Trip = require("./Trip");

const tripSchema = new EntitySchema({
  name: "Trip",
  tableName: "trips",
  columns: {
    id: {
      primary: true,
      type: "bigint",
      generated: "increment",
    },
    user_id: {
      type: "bigint",
    },
    schedule_id: {
      type: "bigint",
      nullable: true,
    },
    title: {
      type: "varchar",
      length: 1000,
      nullable: false,
    },
    content: {
      type: "text",
    },
    likes: {
      type: "int",
      nullable: true,
    },
    views: {
      type: "int",
      nullable: true,
    },
    location: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    started_at: {
      type: "datetime",
      nullable: true,
    },
    end_at: {
      type: "datetime",
      nullable: true,
    },
    hashtag: {
      type: "varchar",
      length: 1000,
      nullable: true,
    },
    hidden: {
      type: "boolean",
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
    schedule: {
      type: "one-to-one",
      target: () => Schedule,
      joinColumn: [{ name: "schedule_id" }],
      cascade: true,
    },
  },
  target: Trip,
});

module.exports = tripSchema;
