const AppError = require("../../misc/AppError");
const commonErrors = require("../../misc/commonErrors");
const logger = require("../../util/logger/logger");
const { setexAsync } = require("../../util/connect/redis");
const { mailCodeExpiresIn } = require("../../config/dotenv");

const storeMailCodeInRedis = async (email, code) => {
  const value = JSON.stringify({
    email: email,
    iat: Math.floor(Date.now() / 1000),
  });
  setexAsync(code, mailCodeExpiresIn, value).catch((error) => {
    logger.error(error);
    throw new AppError(commonErrors.databaseError, 500, "Internal Server");
  });
};

module.exports = {
  storeMailCodeInRedis,
};
