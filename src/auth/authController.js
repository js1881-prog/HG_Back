const logger = require("../util/logger/logger");
const buildResponse = require("../util/response/buildResponse");
const authServiceInstance = require("./authServiceInstance");

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

  async postReplacePassword(req, res, next) {
    try {
      const email = req.body.email;
      const temporaryPassword = res.locals.mailCode;
      await authServiceInstance.changePassword(email, temporaryPassword);
      res.status(200).json(buildResponse(null));
    } catch (error) {
      next(error);
    }
  },

  async getMailCode(req, res, next) {
    try {
      res.status(200).json(buildResponse(null));
    } catch (error) {
      next(error);
    }
  },

  async getUserName(req, res, next) {
    try {
      const email = req.locals.email;
      const userName = await authServiceInstance.searchUserName(email);
      res.status(200).json(buildResponse(userName));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
