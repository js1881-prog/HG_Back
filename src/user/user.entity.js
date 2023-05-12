const { EntitySchema } = require("typeorm");
const User = require("./User");

const userSchema = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "bigint",
      generated: "increment",
    },
    nickname: {
      type: "varchar",
      nullable: true,
      unique: true,
      length: 100,
    },
    user_name: {
      type: "varchar",
      nullable: true,
    },
    password: {
      type: "varchar",
      nullable: false,
      length: 500,
    },
    role: {
      type: "varchar",
      nullable: false,
    },
    phone_number: {
      type: "varchar",
      nullable: true,
      length: 20,
    },
    email: {
      type: "varchar",
      nullable: false,
      length: 100,
    },
    intro: {
      type: "varchar",
      length: 1000,
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

  //    Create follows table
  //  +-------------+--------+------+-----+---------+-------+
  //  | Field       | Type   | Null | Key | Default | Extra |
  //  +-------------+--------+------+-----+---------+-------+
  //  | follow      | bigint | NO   | PRI | NULL    |       |
  //  | target      | bigint | NO   | PRI | NULL    |       |
  //  +-------------+--------+------+-----+---------+-------+
  //  Repository ex) user1.follow.push(user2); => user1 follow user2
  relations: {
    follow: {
      type: "many-to-many",
      target: "User",
      inverseSide: "followTarget",
      joinTable: {
        name: "follows",
        joinColumns: [
          {
            name: "follow",
            referencedColumnName: "id",
          },
        ],
        inverseJoinColumns: [
          {
            name: "target",
            referencedColumnName: "id",
          },
        ],
      },
      cascade: true,
    },
    followTarget: {
      type: "many-to-many",
      target: "User",
      inverseSide: "follow",
    },

    //    Create subscriptions table
    //  +------------+--------+------+-----+---------+-------+
    //  | Field      | Type   | Null | Key | Default | Extra |
    //  +------------+--------+------+-----+---------+-------+
    //  | subscriber | bigint | NO   | PRI | NULL    |       |
    //  | target     | bigint | NO   | PRI | NULL    |       |
    //  +------------+--------+------+-----+---------+-------+
    //  Repository ex) user1.subscribe.push(user2); => user1 subscribe user2
    subscribe: {
      type: "many-to-many",
      target: "User",
      inverseSide: "subscribeTarget",
      joinTable: {
        name: "subscriptions",
        joinColumns: [
          {
            name: "subscriber",
            referencedColumnName: "id",
          },
        ],
        inverseJoinColumns: [
          {
            name: "target",
            referencedColumnName: "id",
          },
        ],
      },
      cascade: true,
    },
    subscribeTarget: {
      type: "many-to-many",
      target: "User",
      inverseSide: "subscribe",
    },
  },
  target: User,
});

module.exports = userSchema;
