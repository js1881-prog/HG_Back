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

module.exports = { Comment };
