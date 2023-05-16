const userServiceInstance = require("./userServiceInstance");
const buildResponse = require("../util/response/buildResponse");

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
};

module.exports = userController;
