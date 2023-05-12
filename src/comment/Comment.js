class Comment {
  id;
  user_id;
  trip_id;
  parent_id;
  content;
  created_at;
  updated_at;
  likes;

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
    this.created_at = createdDate || new Date();
    this.updated_at = updatedDate || new Date();
    this.likes = likes;
  }

  incrementLikes() {
    this.likes++;
    this.save();
  }

  decrementLikes() {
    this.likes--;
    this.save();
  }
}

module.exports = { Comment };
