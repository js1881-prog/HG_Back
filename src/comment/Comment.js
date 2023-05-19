class Comment {
  constructor(
    id,
    user_id,
    trip_id,
    parent_id,
    content,
    created_at = new Date(),
    updated_at = new Date(),
    likes
  ) {
    this.id = id;
    this.user_id = user_id;
    this.trip_id = trip_id;
    this.parent_id = parent_id;
    this.content = content;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.likes = likes;
    this.liked_by = new Set();
  }

  incrementLikes(userId) {
    if (!this.liked_by.has(userId)) {
      this.likes++;
      this.liked_by.add(userId);
    }
  }

  decrementLikes(userId) {
    if (this.liked_by.has(userId)) {
      this.likes--;
      this.liked_by.delete(userId);
    }
  }

  toJSON() {
    return {
      liked_by: Array.from(this.liked_by),
    };
  }

  static fromLikedByArray(likedByArray) {
    const comment = new Comment();
    comment.liked_by = new Set(likedByArray);
    return comment;
  }
}

module.exports = { Comment };
