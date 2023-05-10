const { EntitySchema } = require("typeorm");
const { UserSchema } = require("../user/user.entity");
const { TripSchema } = require("../trip/trip.entity");

class Comment {
  comment_id;
  user_id;
  trip_id;
  parent_id;
  content;
  created_at;
  likes;
}

const CommentSchema = new EntitySchema({
  name: "Comment",
  tableName: "Comment",
  columns: {
    comment_id: {
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
      type: "datetime",
      nullable: true,
    },
    likes: {
      type: "int",
      nullable: true,
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
    parentComment: {
      type: "many-to-one",
      target: () => CommentSchema,
      joinColumn: { name: "parent_id" },
      nullable: true,
    },
    childComments: {
      type: "one-to-many",
      target: () => CommentSchema,
      mappedBy: "parentComment",
    },
  },
});

module.exports = { Comment, CommentSchema };
