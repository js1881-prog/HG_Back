class Image {
  constructor(
    id,
    imageId,
    userId,
    tripId,
    imageUrl,
    imageName,
    use,
    number,
    createdDate,
    updatedDate,
    deletedDate
  ) {
    this.id = id;
    this.imageId = imageId;
    this.userId = userId;
    this.tripId = tripId;
    this.imageUri = imageUrl;
    this.imageName = imageName;
    this.use = use;
    this.number = number;
    this.created_at = createdDate || new Date();
    this.updated_at = updatedDate || new Date();
    this.deletedDate = deletedDate || new Date();
  }
}

module.exports = Image;
