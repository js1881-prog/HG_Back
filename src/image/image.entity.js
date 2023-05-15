const { EntitySchema } = require("typeorm");
const User = require("../user/User");

// +------------+--------------+------+-----+-------------------+-----------------------------------------------+
// | Field      | Type         | Null | Key | Default           | Extra                                         |
// +------------+--------------+------+-----+-------------------+-----------------------------------------------+
// | id         | bigint       | NO   | PRI | NULL              | auto_increment                                |
// | user_id    | bigint       | YES  | MUL | NULL              |                                               |
// | image_url  | text         | NO   |     | NULL              |                                               |
// | image_name | text         | NO   |     | NULL              |                                               |
// | use        | varchar(255) | NO   |     | NULL              |                                               |
// | number     | int          | NO   |     | NULL              |                                               |
// | created_at | timestamp    | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
// | updated_at | timestamp    | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
// | deleted_at | timestamp    | YES  |     | NULL              |                                               |
// +------------+--------------+------+-----+-------------------+-----------------------------------------------+
const imageSchema = new EntitySchema({
  name: "Image",
  tableName: "images",
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
    image_url: {
      type: "text",
      nullable: false,
    },
    image_name: {
      type: "text",
    },
    use: {
      type: "varchar",
    },
    number: {
      type: "int",
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
});

module.exports = imageSchema;
