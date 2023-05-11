const AppError = require("../../../misc/AppError");
const commonErrors = require("../../../misc/commonErrors");
const { setexAsync } = require("../../../util/connect/redis");
const logger = require("../../../util/logger/logger");
const {
  redisAccessTokenExpiresIn,
  redisRefreshTokenExpiresIn,
} = require("../../../config/dotenv");

const storeTokensInRedis = async (accessToken, refreshToken, user) => {
  const value = JSON.stringify({
    sub: user.id,
    name: user.name,
    iat: Math.floor(Date.now() / 1000),
  });
  try {
    setexAsync(accessToken, redisAccessTokenExpiresIn, value);
    setexAsync(refreshToken, redisRefreshTokenExpiresIn, value);
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
