const { EntitySchema } = require("typeorm");
const { User } = require("../user/user.entity");
const { Schedule } = require("../schedule/schedule.entity");

class Trip {
  constructor(
    tripId,
    userId,
    title,
    content,
    createdDate,
    updatedDate,
    likes,
    views,
    location,
    startedDate,
    endDate,
    hashtag,
    scheduleId
  ) {
    thie.trip_id = tripId;
    thie.user_id = userId;
    thie.title = title;
    thie.content = content;
    thie.created_at = createdDate;
    thie.updated_at = updatedDate;
    thie.likes = likes;
    thie.views = views;
    thie.location = location;
    thie.started_at = startedDate;
    thie.end_at = endDate;
    thie.hashtag = hashtag;
    thie.schedule_id = scheduleId;
  }
}

const tripSchema = new EntitySchema({
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
      createDate: true,
    },
    updated_at: {
      type: "datetime",
      updateDate: true,
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
      target: () => User,
      joinColumn: { name: "user_id" },
      onDelete: "CASCADE",
    },
    schedule: {
      type: "many-to-one",
      target: () => Schedule,
      joinColumn: { name: "schedule_id" },
      onDelete: "SET NULL",
    },
  },
});

module.exports = { Trip, tripSchema };
