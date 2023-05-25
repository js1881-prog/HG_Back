class TripViews {
  constructor(
    id,
    user_id,
    trip_id,
    like_flag = false,
    createdDate,
    updatedDate
  ) {
    this.id = id;
    this.user_id = user_id;
    this.trip_id = trip_id;
    this.like_flag = like_flag;
    this.created_at = createdDate || new Date();
    this.updated_at = updatedDate || new Date();
  }
}

module.exports = TripViews;
