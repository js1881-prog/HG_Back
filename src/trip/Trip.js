class Trip {
  constructor(
    id,
    userId,
    scheduleId,
    title,
    content,
    likes,
    views,
    location,
    thumbnail,
    startedDate,
    endDate,
    hashtag,
    hidden,
    createdDate,
    updatedDate
  ) {
    this.id = id;
    this.userId = userId;
    this.scheduleId = scheduleId;
    this.title = title;
    this.content = content;
    this.likes = likes;
    this.views = views;
    this.location = location;
    this.thumbnail = thumbnail;
    this.started_at = startedDate;
    this.end_at = endDate;
    this.hashtag = hashtag;
    this.hidden = hidden;
    this.created_at = createdDate || new Date();
    this.updated_at = updatedDate || new Date();
  }
}

module.exports = Trip;