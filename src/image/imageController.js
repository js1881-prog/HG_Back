const logger = require("../util/logger/logger");
const buildResponse = require("../util/response/buildResponse");
const imageService = require("./imageService.js");

const imageController = {
  async postImage(req, res, next) {
    try {
      const { use, number } = req.body;
      const url = "http://abcdefg.com/images/289249823.jpg";
      const name = "이미지 이름";
      const imageData = {
        user_id: 3,
        image_url: url,
        image_name: name,
        use,
        number,
      };
      const image = await imageService.createImage(imageData);
      res.status(200).json(buildResponse(null, image));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  async getImage(req, res, next) {
    try {
      const imageId = req.query.id;
      const image = await imageService.getImage(imageId);
      res.status(200).json(buildResponse(null, image));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  async getImages(req, res, next) {
    try {
      const image = await imageService.getAllImages();
      res.status(200).json(buildResponse(null, image));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  async updateImage(req, res, next) {
    try {
      const imageId = req.query.id;
      const { url, name, use, number } = req.body;
      const imageData = {
        url,
        name,
        use,
        number
      };
      const image = await imageService.updateImage(imageId, imageData);
      res.status(200).json(buildResponse(null, image));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  async deleteImage(req, res, next) {
    try {
      const imageId = req.query.id;
      const image = await imageService.deleteImage(imageId);
      res.status(200).json(buildResponse(null, image));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

};

module.exports = imageController;
