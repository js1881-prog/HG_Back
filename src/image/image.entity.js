const { EntitySchema } = require("typeorm");
const { User } = require("../user/user.entity");
const { Trip } = require("../trip/trip.entity");

class Image {
  constructor(image_id, user_id, trip_id, image_url, user, trip) {
    this.image_id = image_id;
    this.user_id = user_id;
    this.trip_id = trip_id;
    this.image_url = image_url;
    this.user = user;
    this.trip = trip;
  }
}

const ImageSchema = new EntitySchema({
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
      type: "varchar",
      length: "255",
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

module.exports = { Image, ImageSchema };
