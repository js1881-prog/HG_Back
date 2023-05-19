const typeORMDataSource = require("../util/connect/typeorm");
const imageSchema = require("./image.entity");
const logger = require("../util/logger/logger");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const minioClient = require("../config/minio");

const imageRepository = {
  async create(imageData, bucketName, objectName, filePath) {
    try {
      const imageRepository = typeORMDataSource.getRepository(imageSchema);
      const result = imageRepository.create(imageData);
      
      minioClient.fPutObject(bucketName, objectName, filePath, function(err, etag) {
        if (err) {
          return next(err); 
        }
        console.log('파일 업로드 완료. ETag:', etag);
      });

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
      const findKey = await imageRepository.findOne({ where: { id: imageId } });
      const bucketName = 'image';
      const imageName = findKey.image_name;

      minioClient.removeObject(bucketName, imageName, function(err, etag) {
        if (err) {
          return next(err); 
        }
        console.log('파일 삭제 완료.', etag);
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
};

module.exports = imageRepository;
