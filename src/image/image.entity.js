const { EntitySchema } = require("typeorm");
const { UserSchema } = require("../user/user.entity");
const { TripSchema } = require("../trip/trip.entity");

class Image {
  image_id;
  user_id;
  trip_id;
  image_url;
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
      length: "max",
      nullable: false,
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: () => UserSchema,
      joinColumn: { name: "user_id" },
    },
    trip: {
      type: "many-to-one",
      target: () => TripSchema,
      joinColumn: { name: "trip_id" },
    },
  },
});

module.exports = { Image, ImageSchema };
