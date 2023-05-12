class Schedule {
  constructor(id, userId, title, startDate, endDate, createdDate, updatedDate) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.start_date = startDate;
    this.end_date = endDate;
    this.created_at = createdDate || new Date();
    this.updated_at = updatedDate || new Date();
  }
}

module.exports = Schedule;
