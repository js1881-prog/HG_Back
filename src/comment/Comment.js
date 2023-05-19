class Comment {
  constructor(
    id = null,
    userId,
    tripId,
    parentId,
    content,
    createdAt = new Date(),
    updatedAt = new Date(),
    likes = 0,
    likedBy = new Set()
  ) {
    this.id = id;
    this.userId = userId;
    this.tripId = tripId;
    this.parentId = parentId;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.likes = likes;
    this.likedBy = likedBy;
  }
  incrementLikes(userId) {
    if (!this.likedBy.has(userId)) {
      this.likes++;
      this.likedBy.add(userId);
    }
  }

  decrementLikes(userId) {
    if (this.likedBy.has(userId)) {
      this.likes--;
      this.likedBy.delete(userId);
    }
  }

  toJSON() {
    return {
      likedBy: Array.from(this.likedBy),
    };
  }
}
class CommentBuilder {
  constructor() {
    this.userId = null;
    this.tripId = null;
    this.parent_id = null;
    this.content = null;
    this.likes = 0;
  }

  setUserId(userId) {
    this.userId = userId;
    return this;
  }

  setTripId(tripId) {
    this.tripId = tripId;
    return this;
  }

  setParentId(parentId) {
    this.parentId = parentId;
    return this;
  }

  setContent(content) {
    this.content = content;
    return this;
  }

  setLikes(likes) {
    this.likes = likes;
    return this;
  }

  // static fromLikedByArray(likedByArray) {
  //   const comment = new Comment();
  //   comment.liked_by = new Set(likedByArray);
  //   return comment;
  // }

  build() {
    return new Comment(
      this.userId,
      this.tripId,
      this.parentId,
      this.content,
      this.likes
    );
  }
}

module.exports = { Comment, CommentBuilder };
