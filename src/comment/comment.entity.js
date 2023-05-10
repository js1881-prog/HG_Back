const { EntitySchema } = require("typeorm");
const { User } = require("../user/user.entity");
const { Trip } = require("../trip/trip.entity");

class Comment {
  constructor(
    comment_id,
    user_id,
    trip_id,
    parent_id,
    content,
    created_at,
    likes
  ) {
    this.comment_id = comment_id;
    this.user_id = user_id;
    this.trip_id = trip_id;
    this.parent_id = parent_id;
    this.content = content;
    this.created_at = created_at;
    this.likes = likes;
  }
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
      target: () => User,
      joinColumn: { name: "user_id" },
    },
    // trip: {
    //   type: "many-to-one",
    //   target: () => Trip,
    //   joinColumn: { name: "trip_id" },
    // },
    // parentComment: {
    //   type: "many-to-one",
    //   target: () => Comment,
    //   joinColumn: { name: "parent_id" },
    //   nullable: true,
    // },
    // childComments: {
    //   type: "one-to-many",
    //   target: () => Comment,
    //   mappedBy: "parentComment",
    // },
  },
});

module.exports = { Comment, CommentSchema };
