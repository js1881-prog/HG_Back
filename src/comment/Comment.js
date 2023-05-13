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
    this.liked_by = liked_by || "";
  }

  incrementLikes() {
    if (!this.liked_by.includes(String(this.user_id))) {
      this.likes++;
      if (this.liked_by) {
        this.liked_by += ",";
      }
      this.liked_by += String(this.user_id);
    }
  }

  decrementLikes() {
    const userIdString = String(this.user_id);
    if (this.liked_by.includes(userIdString)) {
      this.likes--;
      this.liked_by = this.liked_by
        .split(",")
        .filter(userId => userId !== userIdString)
        .join(",");
    }
  }
}

module.exports = { Comment };
