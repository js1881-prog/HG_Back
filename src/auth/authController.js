const logger = require("../util/logger/logger");
const buildResponse = require("../util/response/buildResponse");

const authController = {
  async postLogin(req, res, next) {
    try {
      const { accessToken, refreshToken } = req.authInfo;
      const authorizationHeader = `Bearer ${accessToken}`;
      res.setHeader("Authorization", authorizationHeader);
      res.cookie("refreshToken", refreshToken, { httpOnly: true });
      res.status(200).json(buildResponse(null));
    } catch (error) {
      next(error);
    }
  },

  async getCheckToken(req, res, next) {
    try {
      res.status(200).json(buildResponse(null));
    } catch (error) {
      next(error);
    }
  },

  async postLogout(req, res, next) {
    try {
      res.clearCookie("refreshToken");
      res.status(200).json(buildResponse(null));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
