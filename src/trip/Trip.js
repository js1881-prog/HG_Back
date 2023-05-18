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
    startedDate,
    endDate,
    hashtag,
    hidden,
    createdDate,
    updatedDate,
    deletedDate
  ) {
    this.id = id;
    this.userId = userId;
    this.scheduleId = scheduleId;
    this.title = title;
    this.content = content;
    this.likes = likes;
    this.views = views;
    this.location = location;
    this.started_at = startedDate;
    this.end_at = endDate;
    this.hashtag = hashtag;
    this.hidden = hidden;
    this.created_at = createdDate || new Date();
    this.updated_at = updatedDate || new Date();
    this.deleted_at = deletedDate || null;
  }
}

module.exports = Trip;
