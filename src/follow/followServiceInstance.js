const followRepository = require("./followRepository");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const logger = require("../util/logger/logger");
const followService = require("./followService");

const followServiceInstance = followService(
  followRepository,
  AppError,
  commonErrors,
  logger
);

module.exports = followServiceInstance;
