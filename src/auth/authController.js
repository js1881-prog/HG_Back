const logger = require("../util/logger/logger");
const buildResponse = require("../util/response/buildResponse");
const { swaggerUi, specs } = require("../config/swagger");

const authController = {
  async postLogin(req, res, next) {
    try {
      const { accessToken, refreshToken } = req;
      const authorizationHeader = `Bearer accessToken=${accessToken} refreshToken=${refreshToken}`;
      res.setHeader("Authorization", authorizationHeader);
      res.status(200).json(buildResponse(null));
    } catch (error) {
      logger.info(error);
      next(error);
    }
  },

  async getValidateAccessToken(req, res, next) {
    try {
      res.status(200).json(buildResponse(null));
    } catch (error) {
      logger.info(error);
      next(error);
    }
  },
};

module.exports = authController;
