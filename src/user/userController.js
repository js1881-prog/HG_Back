const userServiceInstance = require("./userServiceInstance");
const buildResponse = require("../util/response/buildResponse");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const userController = {
  async postSignup(req, res, next) {
    try {
      const user = req.body;
      await userServiceInstance.signup(user);
      res.status(200).json(buildResponse(null));
    } catch (error) {
      next(error);
    }
  },

  async putUpdateProfile(req, res, next) {
    try {
      const { nickName, intro } = req.body;
      const user = req.user;
      await userServiceInstance.changeProfile(user, nickName, intro);
      res.status(200).json(buildResponse(null));
    } catch (error) {
      next(error);
    }
  },
  
  async getProfile(req, res, next) {
    try {
      const userName = req.body && req.body.userName ? req.body.userName : req.user.name;
      if (!userName) {
        next(new AppError(commonErrors.inputError, 401, "Bad Request"));
      }
      const datas = await userServiceInstance.searchInfo(userName);
      res.status(200).json(buildResponse(datas));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
