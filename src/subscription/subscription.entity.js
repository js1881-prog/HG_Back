const { EntitySchema } = require("typeorm");
const { User } = require("../user/user.entity");

class Subscription {
  subscriber_id;
  user_id;
}

const SubscriptionSchema = new EntitySchema({
  name: "Subscription",
  tableName: "Subscription",
  columns: {
    subscriber_id: {
      type: "bigint",
      primary: true,
    },
    user_id: {
      type: "bigint",
      primary: true,
    },
  },
  relations: {
    subscriber: {
      type: "many-to-one",
      target: () => User,
      joinColumn: { name: "subscriber_id" },
    },
    user: {
      type: "many-to-one",
      target: () => User,
      joinColumn: { name: "user_id" },
    },
  },
});

module.exports = { Subscription, SubscriptionSchema };
