const { EntitySchema } = require("typeorm");
const { User } = require("../user/user.entity");

class Follower {
  follower_id;
  user_id;
}

const FollowerSchema = new EntitySchema({
  name: "Follower",
  tableName: "Follower",
  columns: {
    follower_id: {
      type: "bigint",
      primary: true,
    },
    user_id: {
      type: "bigint",
      primary: true,
    },
  },
  relations: {
    follower: {
      type: "many-to-one",
      target: () => User,
      joinColumn: { name: "follower_id" },
    },
    user: {
      type: "many-to-one",
      target: () => User,
      joinColumn: { name: "user_id" },
    },
  },
});

module.exports = { Follower, FollowerSchema };
