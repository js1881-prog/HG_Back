const { EntitySchema } = require("typeorm");
const { User } = require("../user/User");
const Trip = require("../trip/Trip");
const TripViews = require("./Tripviews");

// +------------+-----------+------+-----+-------------------+-----------------------------------------------+
// | Field      | Type      | Null | Key | Default           | Extra                                         |
// +------------+-----------+------+-----+-------------------+-----------------------------------------------+
// | id         | bigint    | NO   | PRI | NULL              | auto_increment                                |
// | user_id    | bigint    | NO   | UNI | NULL              |                                               |
// | trip_id    | bigint    | NO   | UNI | NULL              |                                               |
// | like_flag  | tinyint   | YES  |     | 0                 |                                               |
// | created_at | timestamp | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
// | updated_at | timestamp | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
// | deleted_at | timestamp | YES  |     | NULL              |                                               |
// +------------+-----------+------+-----+-------------------+-----------------------------------------------+
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
      nullable: false,
    },
    trip_id: {
      type: "bigint",
      nullable: false,
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
