const AppError = require("../../../misc/AppError");
const commonErrors = require("../../../misc/commonErrors");
const { setexAsync } = require("../../../util/connect/redis");
const logger = require("../../../util/logger/logger");

const storeTokensInRedis = async (accessToken, refreshToken, user) => {
  try {
    const value = JSON.stringify({
      sub: user.id,
      name: user.name,
      iat: Math.floor(Date.now() / 1000),
    });
    const timeToLive2H = 60 * 120;
    const timeToLive30D = 2592000;
    setexAsync(accessToken, timeToLive2H, value);
    setexAsync(refreshToken, timeToLive30D, value);
  } catch (error) {
    logger.error(error);
    throw new AppError(
      commonErrors.databaseError,
      500,
      "Failed to store tokens in Redis"
    );
  }
};

module.exports = {
  storeTokensInRedis,
};
