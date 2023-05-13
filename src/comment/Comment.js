class Comment {
  id;
  user_id;
  trip_id;
  parent_id;
  content;
  created_at;
  updated_at;
  likes;
  liked_by;

  constructor(
    id,
    user_id,
    trip_id,
    parent_id,
    content,
    created_at,
    updated_at,
    likes
  ) {
    this.id = id;
    this.user_id = user_id;
    this.trip_id = trip_id;
    this.parent_id = parent_id;
    this.content = content;
    this.created_at = created_at || new Date();
    this.updated_at = updated_at || new Date();
    this.likes = likes;
    this.liked_by = new Set();
  }

  incrementLikes() {
    if (!this.liked_by.has(this.user_id)) {
      this.likes++;
      this.liked_by.add(this.user_id);
    }
  }

  decrementLikes() {
    if (this.liked_by.has(this.user_id)) {
      this.likes--;
      this.liked_by.delete(this.user_id);
    }
  }

  toJSON() {
    return {
      liked_by: Array.from(this.liked_by),
    };
  }

  static fromJSON(json) {
    const data = JSON.parse(json);
    const {
      id,
      user_id,
      trip_id,
      parent_id,
      content,
      created_at,
      updated_at,
      likes,
    } = data;
    const comment = new Comment(
      id,
      user_id,
      trip_id,
      parent_id,
      content,
      created_at,
      updated_at,
      likes
    );
    comment.liked_by = new Set(data.liked_by);
    return comment;
  }
}

module.exports = { Comment };
