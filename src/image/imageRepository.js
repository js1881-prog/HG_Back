const typeORMDataSource = require("../util/connect/typeorm");
const imageSchema = require("./image.entity");
const logger = require("../util/logger/logger");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const imageRepository = {
  async create(imageData) {
    try {
      const imageRepository = typeORMDataSource.getRepository(imageSchema);
      const result = imageRepository.create(imageData);
      return await imageRepository.save(result);
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },

  async findImageById(imageId) {
    try {
      const imageRepository = typeORMDataSource.getRepository(imageSchema);
      const result = imageRepository.findOneBy({
        id: imageId,
      });
      return result;
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },

  async findImageAll() {
    try {
      const imageRepository = typeORMDataSource.getRepository(imageSchema);
      const result = imageRepository.find();
      return result;
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },

  async updateImage(imageId, imageData) {
    try {
      const imageRepository = typeORMDataSource.getRepository(imageSchema);
      const imageFind = imageRepository.findOneBy({
        id: imageId,
      });
      typeORMDataSource.merge(imageFind, imageData);
      const result = await imageRepository.save(imageFind);
      return result;
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },

  async deleteImage(imageId) {
    try {
      const imageRepository = typeORMDataSource.getRepository(imageSchema);
      const result = imageRepository.delete(imageId);
      return result;
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },

};

module.exports = imageRepository;
