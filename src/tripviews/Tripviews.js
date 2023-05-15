class TripViews {
  constructor(
    tripCountId,
    userId,
    tripId,
    likeFlag = false,
    createdDate,
    updatedDate
  ) {
    this.trip_count_id = tripCountId;
    this.user_id = userId;
    this.trip_id = tripId;
    this.like_flag = likeFlag;
    this.created_at = createdDate || new Date();
    this.updated_at = updatedDate || new Date();
  }
}

module.exports = TripViews;
