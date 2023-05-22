const userService = require("./userService.js");
const { User, UserBuilder } = require("./User");
const userRepository = require("./userRepository");
const followRepository = require("../follow/followRepository.js");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const logger = require("../util/logger/logger");
const {
  hashPassword,
  comparePassword,
} = require("../util/encrypt/hashPassword.js");

const userServiceInstance = userService(
  User,
  UserBuilder,
  userRepository,
  followRepository,
  AppError,
  commonErrors,
  logger,
  hashPassword,
  comparePassword
);

module.exports = userServiceInstance;
