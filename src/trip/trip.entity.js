const { EntitySchema } = require("typeorm");
const { User } = require("../user/user.entity");
const { Schedule } = require("../schedule/schedule.entity");

class Trip {
  constructor(
    trip_id,
    user_id,
    title,
    content,
    created_at,
    updated_at,
    likes,
    views,
    location,
    started_at,
    end_at,
    hashtag,
    schedule_id
  ) {
    this.trip_id = trip_id;
    this.user_id = user_id;
    this.title = title;
    this.content = content;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.likes = likes;
    this.views = views;
    this.location = location;
    this.started_at = started_at;
    this.end_at = end_at;
    this.hashtag = hashtag;
    this.schedule_id = schedule_id;
  }
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
  uniques: [
    {
      name: "UQ_User_Trip_Likes",
      columns: ["user_id", "trip_id", "likes"],
    },
    {
      name: "UQ_User_Trip_Views",
      columns: ["user_id", "trip_id", "views"],
    },
  ],
  relations: {
    user: {
      type: "many-to-one",
      target: () => User,
      joinColumn: { name: "user_id" },
    },
    schedule: {
      type: "many-to-one",
      target: () => Schedule,
      joinColumn: { name: "schedule_id" },
    },
  },
});

module.exports = { Trip };
