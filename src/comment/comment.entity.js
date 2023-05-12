const { EntitySchema } = require("typeorm");
const { User } = require("../user/user.entity");
const { Trip } = require("../trip/trip.entity");

class Comment {
  constructor(
    commentId,
    userId,
    tripId,
    parentId,
    content,
    createdDate,
    likes
  ) {
    this.comment_id = commentId;
    this.user_id = userId;
    this.trip_id = tripId;
    this.parent_id = parentId;
    this.content = content;
    this.created_at = createdDate;
    this.likes = likes;
  }
}

const commentSchema = new EntitySchema({
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
    trip: {
      type: "many-to-one",
      target: () => Trip,
      joinColumn: { name: "trip_id" },
    },
    parentComment: {
      type: "many-to-one",
      target: () => Comment,
      joinColumn: { name: "parent_id" },
      nullable: true,
    },
    childComments: {
      type: "one-to-many",
      target: () => Comment,
      mappedBy: "parentComment",
    },
  },
});

module.exports = { Comment, commentSchema };