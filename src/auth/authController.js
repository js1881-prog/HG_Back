const logger = require("../util/logger/logger");

const authController = {
  async postLogin(req, res, next) {
    try {
      res.json({
        status: "OK",
        user: req.user, 
        accessToken: req.accessToken,
        refreshToken: req.refreshToken,
      });
    } catch (error) {
      logger.info(error);
      next(error);
    }
  },
};

module.exports = authController;