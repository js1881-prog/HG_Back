const AppError = require("../../../misc/AppError");
const commonErrors = require("../../../misc/commonErrors");
const { redis } = require("../../../util/connect/redis");
const logger = require("../../../util/logger/logger");

const findValueInRedis = async (key) => {
  const value = redis.get(key).catch((error) => {
    logger.error(error);
    throw new AppError(
      commonErrors.databaseError,
      500,
      "Internal Server Error"
    );
  });
  return value;
};

module.exports = { findValueInRedis };
