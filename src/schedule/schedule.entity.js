const { EntitySchema } = require("typeorm");
const { User } = require("../user/User");
const Schedule = require("./Schedule");

// +------------+--------------+------+-----+-------------------+-----------------------------------------------+
// | Field      | Type         | Null | Key | Default           | Extra                                         |
// +------------+--------------+------+-----+-------------------+-----------------------------------------------+
// | id         | bigint       | NO   | PRI | NULL              | auto_increment                                |
// | user_id    | bigint       | NO   | MUL | NULL              |                                               |
// | title      | varchar(100) | YES  |     | NULL              |                                               |
// | start_date | date         | NO   |     | NULL              |                                               |
// | end_date   | date         | NO   |     | NULL              |                                               |
// | created_at | timestamp    | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
// | updated_at | timestamp    | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
// | deleted_at | timestamp    | YES  |     | NULL              |                                               |
// +------------+--------------+------+-----+-------------------+-----------------------------------------------+
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
  },
  target: Schedule,
});

module.exports = scheduleSchema;
