class Trip {
  constructor(
    id,
    user_id,
    schedule_id,
    title,
    content,
    likes,
    views,
    location,
    thumbnail,
    gps,
    started_at,
    end_at,
    hashtag,
    hidden,
    created_at,
    updated_at,
    deleted_at
  ) {
    this.id = id;
    this.user_id = user_id;
    this.schedule_id = schedule_id || null;
    this.title = title;
    this.content = content;
    this.likes = likes;
    this.views = views;
    this.location = location;
    this.thumbnail = thumbnail;
    this.gps = gps;
    this.started_at = started_at;
    this.end_at = end_at;
    this.hashtag = hashtag;
    this.hidden = hidden;
    this.created_at = created_at || new Date();
    this.updated_at = updated_at || new Date();
    this.deleted_at = deleted_at || null;
  }
}

module.exports = Trip;
