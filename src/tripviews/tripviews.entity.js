const { EntitySchema } = require("typeorm");
const User = require("../user/User");
const Trip = require("../trip/Trip");
const TripViews = require("./Tripviews");

const tripViewsSchema = new EntitySchema({
  name: "TripViews",
  tableName: "tripviews",
  columns: {
    id: {
      primary: true,
      type: "bigint",
      generated: "increment",
    },
    user_id: {
      type: "bigint",
      nullable: false
    },
    trip_id: {
      type: "bigint",
      nullable: false
    },
    like_flag: {
      type: "boolean",
      nullable: true,
      default: 0,
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
      type: "one-to-one",
      target: () => User,
      joinColumn: { name: "user_id" },
    },
    trip: {
      type: "one-to-one",
      target: () => Trip,
      joinColumn: { name: "trip_id" },
    },
  },
  target: TripViews,
});

module.exports = tripViewsSchema;
