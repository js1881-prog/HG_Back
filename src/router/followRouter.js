const express = require("express");
const followRouter = express.Router();
const followController = require("../follow/followController");
const extract = require("../middleware/extract");

followRouter.get(
  "/list",
  extract.bearerToken,
  extract.decodeBearerToken,
  followController.getMyFollows
);

followRouter.post(
  "/add",
  extract.bearerToken,
  extract.decodeBearerToken,
  followController.postFollow
);

followRouter.delete(
  "/delete",
  extract.bearerToken,
  extract.decodeBearerToken,
  followController.deleteFollow
);

module.exports = followRouter;
