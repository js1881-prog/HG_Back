const { EntitySchema } = require("typeorm");
const { User } = require("../user/user.entity");
const { Trip } = require("../trip/trip.entity");

class Image {
  constructor(imageId, userId, tripId, imageUrl) {
    this.image_id = imageId;
    this.user_id = userId;
    this.trip_id = tripId;
    this.image_url = imageUrl;
  }
}

const imageSchema = new EntitySchema({
  name: "Image",
  tableName: "Image",
  columns: {
    image_id: {
      type: "bigint",
      primary: true,
      generated: true,
    },
    user_id: {
      type: "bigint",
      nullable: true,
    },
    trip_id: {
      type: "bigint",
      nullable: true,
    },
    image_url: {
      type: "text",
      nullable: false,
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: () => User,
      joinColumn: { name: "user_id" },
    },
    trip: {
      type: "many-to-one",
      target: () => Trip,
      joinColumn: { name: "trip_id" },
    },
  },
});

module.exports = { Image, imageSchema };
