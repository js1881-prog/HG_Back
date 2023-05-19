class Image {
  constructor(
    id,
    imageId,
    userId,
    tripId,
    imageUrl,
    imageName,
    createdDate,
    updatedDate
  ) {
    this.id = id;
    this.imageId = imageId;
    this.userId = userId;
    this.tripId = tripId;
    this.imageUri = imageUrl;
    this.imageName = imageName;
    this.created_at = createdDate || new Date();
    this.updated_at = updatedDate || new Date();
  }
}

module.exports = Image;
