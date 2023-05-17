const imageRepository = require("./imageRepository");

const ImageService = {
  async createImage(imageData) {
    const createImages = await imageRepository.create(imageData);
    return createImages;
  },
  
  async getImage(imageId) {
    const getImage = await imageRepository.findImageById(imageId);
    if (!createImages) {
      throw new AppError(
        commonErrors.notfoundError,
        404,
        "Image not found"
      );
    }
    return getImage;
  },

  async getAllImages() {
    const getAllImages = await imageRepository.findImageAll();
    return getAllImages;
  },

  async updateImage(imageId, imageData) {
    const updateImage = await imageRepository.updateImage(imageId, imageData);
    if (!updateImage) {
      throw new AppError(
        commonErrors.notfoundError,
        404,
        "Image not found"
      );
    }
    return updateImage;
  },

  async deleteImage(imageId) {
    const deleteImage = await imageRepository.deleteImage(imageId);
    if (!deleteImage) {
      throw new AppError(
        commonErrors.notfoundError,
        404,
        "Image not found"
      );
    }
    return deleteImage;
  },

};

module.exports = ImageService;
