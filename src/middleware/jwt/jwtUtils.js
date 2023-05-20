const jwt = require("jsonwebtoken");
const {
  jwtSecret,
  jwtAccessTokenExpiresIn,
  jwtRefreshTokenExpiresIn,
} = require("../../config/dotenv");
const AppError = require("../../misc/AppError");
const commonErrors = require("../../misc/commonErrors");
const logger = require("../../util/logger/logger");
const { deleteKeysInRedis } = require("../redis/deleteKeysInRedis");
const { findValueInRedis } = require("../redis/findValueInRedis");

const jwtUtils = {
  async verifyToken(req, res, next) {
    const token = res.locals.accessToken || res.locals.refreshToken;
    const value = await findValueInRedis(token);
    if (value === null) {
      next(new AppError(commonErrors.authenticationError, 401, "Unauthorized"));
    }
    req.user = value;
    next();
  },

  async deleteTokens(req, res, next) {
    const accessToken = res.locals.accessToken;
    const refreshToken = res.locals.refreshToken;
    const count = await deleteKeysInRedis([accessToken, refreshToken]).catch(
      (error) => next(error)
    );
    if (count === 0) {
      next(
        new AppError(
          commonErrors.resourceNotFoundError,
          404,
          "Logout has already been processed"
        )
      );
    }
    next();
  },

  generateAccessToken(user) {
    const payload = {
      name: user.name,
      nickName: user.nickName,
      email: user.email,
      role: user.role,
    };
    return jwt.sign(payload, jwtSecret, {
      expiresIn: jwtAccessTokenExpiresIn,
    });
  },

  generateRefreshToken(user) {
    const payload = {
      name: user.name,
      nickname: user.nickname,
      email: user.email,
      role: user.role,
    };
    return jwt.sign(payload, jwtSecret, {
      expiresIn: jwtRefreshTokenExpiresIn,
    });
  },
};

module.exports = jwtUtils;
