const buildResponse = require("../util/response/buildResponse");
const followServiceInstance = require("./followServiceInstance");

const followController = {
  async postFollow(req, res, next) {
    try {
      const { targetName } = req.body;
      const userName = req.user.name;
      await followServiceInstance.follow(userName, targetName);
      res.status(200).json(buildResponse(null));
    } catch (error) {
      next(error);
    }
  },

  async deleteFollow(req, res, next) {
    try {
      const { targetName } = req.body;
      const userName = req.user.name;
      await followServiceInstance.unfollow(userName, targetName);
      res.status(200).json(buildResponse(null));
    } catch (error) {
      next(error);
    }
  },

  async getMyFollows(req, res, next) {
    try {
      const userName = req.user.name;
      const followCount = await followServiceInstance.searchFollowsCount(
        userName
      );
      res.status(200).json(buildResponse(followCount));
    } catch (error) {
      next(error);
    }
  },

  async getMyFollowers(req, res, next) {
    try {
      const userName = req.user.userName;
      const followerCount = await followServiceInstance.searchFollowersCount(
        userName
      );
      res.status(200).json(buildResponse(followerCount));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = followController;
