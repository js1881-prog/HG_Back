const AppError = require("../../../misc/AppError");
const commonErrors = require("../../../misc/commonErrors");
const { redis } = require("../../../util/connect/redis");
const logger = require("../../../util/logger/logger");

const deleteKeysInRedis = async (keys) => {
  return redis.del(keys, (error, count) => {
    if (error) {
      logger.error(error);
      reject(
        new AppError(commonErrors.databaseError, 500, "Internal Server Error")
      );
    }
    resolve(count);
  });
};

module.exports = { deleteKeysInRedis };
