const { EntitySchema } = require("typeorm");
const { UserSchema } = require("../user/user.entity");
const { ScheduleSchema } = require("./scheduke/schedule.entity");

class Trip {
  trip_id;
  user_id;
  title;
  content;
  created_at;
  updated_at;
  likes;
  views;
  location;
  started_at;
  end_at;
  hashtag;
  schedule_id;
}

const TripSchema = new EntitySchema({
  name: "Trip",
  tableName: "Trip",
  columns: {
    trip_id: {
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
      nullable: false,
    },
    content: {
      type: "text",
      nullable: false,
    },
    created_at: {
      type: "datetime",
    },
    updated_at: {
      type: "datetime",
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
      length: 100,
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
    schedule_id: {
      type: "bigint",
      nullable: true,
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: () => UserSchema,
      joinColumn: { name: "user_id" },
    },
    schedule: {
      type: "many-to-one",
      target: () => ScheduleSchema,
      joinColumn: { name: "schedule_id" },
    },
  },
});

module.exports = { Trip, TripSchema };
