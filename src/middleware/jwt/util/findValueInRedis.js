const AppError = require("../../../misc/AppError");
const commonErrors = require("../../../misc/commonErrors");
const redis = require("../../../util/connect/redis");

function findValueInRedis(key) {
  return new Promise((resolve, reject) => {
    redis.get(key, (err, value) => {
      if (err) {
        reject(
          new AppError(commonErrors.databaseError, 500, "Internal Server Error")
        );
      } else if (value === null) {
        resolve(null);
      } else {
        resolve(value);
      }
    });
  });
}

module.exports = { findValueInRedis };
