const authService = require("./authService.js");
const { User, UserBuilder } = require("../user/User");
const userRepository = require("../user/userRepository");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const logger = require("../util/logger/logger");
const { hashPassword } = require("../util/encrypt/hashPassword.js");

const authServiceInstance = authService(
  User,
  UserBuilder,
  userRepository,
  AppError,
  commonErrors,
  logger,
  hashPassword
);

module.exports = authServiceInstance;
