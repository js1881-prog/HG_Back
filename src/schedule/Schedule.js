class Schedule {
  constructor(
    id,
    user_id,
    title,
    start_date,
    end_date,
    createdDate,
    updatedDate,
    deletedDate
  ) {
    this.id = id;
    this.user_id = user_id;
    this.title = title;
    this.start_date = start_date;
    this.end_date = end_date;
    this.created_at = createdDate || new Date();
    this.updated_at = updatedDate || new Date();
    this.deleted_at = deletedDate || null;
  }
}

module.exports = Schedule;
