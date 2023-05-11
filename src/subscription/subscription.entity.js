const { EntitySchema } = require("typeorm");
const { User } = require("../user/user.entity");

class Subscription {
  constructor(subscriberId, userId) {
    this.subscriber_id = subscriberId;
    this.user_id = userId;
  }
}

const subscriptionSchema = new EntitySchema({
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

module.exports = { Subscription, subscriptionSchema };
