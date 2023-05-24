const { EntitySchema } = require("typeorm");
const { User } = require("../user/User");
const Trip = require("../trip/Trip");

// +------------+-----------+------+-----+-------------------+-----------------------------------------------+
// | Field      | Type      | Null | Key | Default           | Extra                                         |
// +------------+-----------+------+-----+-------------------+-----------------------------------------------+
// | id         | bigint    | NO   | PRI | NULL              | auto_increment                                |
// | user_id    | bigint    | NO   | MUL | NULL              |                                               |
// | trip_id    | bigint    | NO   | MUL | NULL              |                                               |
// | parent_id  | bigint    | YES  | MUL | NULL              |                                               |
// | content    | text      | YES  |     | NULL              |                                               |
// | created_at | timestamp | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
// | updated_at | timestamp | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
// | likes      | int       | NO   |     | 0                 |                                               |
// | liked_by   | json      | NO   |     | NULL              |                                               |
// +------------+-----------+------+-----+-------------------+-----------------------------------------------+
const commentSchema = new EntitySchema({
  name: "Comment",
  tableName: "comments",
  columns: {
    id: {
      type: "bigint",
      primary: true,
      generated: true,
    },
    user_id: {
      type: "bigint",
    },
    trip_id: {
      type: "bigint",
    },
    parent_id: {
      type: "bigint",
      nullable: true,
    },
    content: {
      type: "text",
      nullable: true,
    },
    created_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    updated_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    likes: {
      type: "integer",
      default: 0,
    },
    liked_by: {
      type: "json",
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
    trip: {
      type: "many-to-one",
      target: () => Trip,
      joinColumn: { name: "trip_id" },
      onDelete: "CASCADE",
    },
    parentComment: {
      type: "many-to-one",
      target: "Comment",
      joinColumn: { name: "parent_id" },
      nullable: true,
    },
    childComments: {
      type: "one-to-many",
      target: "Comment",
      mappedBy: "parentComment",
    },
  },
});

module.exports = commentSchema;
