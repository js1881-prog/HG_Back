const AppError = require("../../misc/AppError");
const commonErrors = require("../../misc/commonErrors");
const logger = require("../../util/logger/logger");
const { setexAsync } = require("../../util/connect/redis");
const {
  redisAccessTokenExpiresIn,
  redisRefreshTokenExpiresIn,
} = require("../../config/dotenv");

const storeTokensInRedis = async (accessToken, refreshToken, user) => {
  const value = JSON.stringify({
    userName: user.userName,
    email: user.email,
    role: user.role,
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
      "Internal Server Error"
    );
  }
};

module.exports = {
  storeTokensInRedis,
};
