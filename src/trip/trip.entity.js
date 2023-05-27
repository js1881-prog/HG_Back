const { EntitySchema } = require("typeorm");
const Schedule = require("../schedule/Schedule");
const { User } = require("../user/User");
const Trip = require("./Trip");

// +-------------+---------------+------+-----+-------------------+-----------------------------------------------+
// | Field       | Type          | Null | Key | Default           | Extra                                         |
// +-------------+---------------+------+-----+-------------------+-----------------------------------------------+
// | id          | bigint        | NO   | PRI | NULL              | auto_increment                                |
// | user_id     | bigint        | NO   | MUL | NULL              |                                               |
// | schedule_id | bigint        | YES  | UNI | NULL              |                                               |
// | title       | varchar(1000) | NO   |     | NULL              |                                               |
// | content     | text          | NO   |     | NULL              |                                               |
// | likes       | int           | YES  |     | NULL              |                                               |
// | views       | int           | YES  |     | NULL              |                                               |
// | location    | varchar(255)  | YES  |     | NULL              |                                               |
// | started_at  | datetime      | YES  |     | NULL              |                                               |
// | end_at      | datetime      | YES  |     | NULL              |                                               |
// | hashtag     | varchar(1000) | YES  |     | NULL              |                                               |
// | hidden      | tinyint       | NO   |     | NULL              |                                               |
// | created_at  | timestamp     | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
// | updated_at  | timestamp     | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
// | deleted_at  | timestamp     | YES  |     | NULL              |                                               |
// +-------------+---------------+------+-----+-------------------+-----------------------------------------------+
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
      nullable: true,
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
      type: "varchar",
    },
    likes: {
      //type: "int",
      type:"integer",
      nullable: true,
      default: 0,
    },
    liked_by: {
      type: "json",
      nullable: true,
    },
    views: {
      type: "int",
      nullable: true,
      default: 0,
    },
    location: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    thumbnail: {
      type: "varchar",
      nullable: false,
    },
    gps: {
      type: "varchar",
      nullable: false,
    },
    started_at: {
      type: "timestamp",
      nullable: true,
    },
    end_at: {
      type: "timestamp",
      nullable: true,
    },
    hashtag: {
      type: "json",
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
    deleted_at: {
      type: "timestamp",
      nullable: true,
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
