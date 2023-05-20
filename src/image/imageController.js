const logger = require("../util/logger/logger");
const buildResponse = require("../util/response/buildResponse");
const imageService = require("./imageService.js");

const imageController = {
  async postMinio(req, res, next) {
    try {
      const bucketName = 'image';
      const objectName = Date.now() + req.file.originalname;

      //http(s)://<minio-server-endpoint>/<bucket-name>/<object-key>
      const imageURL = bucketName + "/" + objectName;
      const filePath = req.file.path; 
      const imageData = {
        user_id: 3,
        image_url: imageURL,
        image_name: objectName,
      };
      const image = await imageService.createImage(imageData, bucketName, objectName, filePath);
      res.status(200).json(buildResponse(image, null));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  async getImage(req, res, next) {
    try {
      const imageId = req.query.id;
      const image = await imageService.getImage(imageId);
      res.status(200).json(buildResponse(image, null));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  async getImages(req, res, next) {
    try {
      const image = await imageService.getAllImages();
      res.status(200).json(buildResponse(image, null));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  async updateImage(req, res, next) {
    try {
      const imageId = req.query.id;
      const { image_url, image_name } = req.body;
      const imageData = {
        image_url,
        image_name,
      };
      const image = await imageService.updateImage(imageId, imageData);
      res.status(200).json(buildResponse(image, null));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  async deleteImage(req, res, next) {
    try {
      const imageId = req.query.id;
      const image = await imageService.deleteImage(imageId);
      res.status(200).json(buildResponse(image, null));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
};

module.exports = imageController;
