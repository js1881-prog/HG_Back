const jwt = require("jsonwebtoken");
const {
  jwtSecret,
  jwtAccessTokenExpiresIn,
  jwtRefreshTokenExpiresIn,
} = require("../../config/dotenv");
const AppError = require("../../misc/AppError");
const commonErrors = require("../../misc/commonErrors");
const { findValueInRedis } = require("./util/findValueInRedis");

const verifytokenInRedis = async (req, res, next) => {
  const token = req.token;
  const value = await findValueInRedis(token).catch((error) => next(error));
  if (value == null) {
    next(new AppError(commonErrors.authenticationError, 401, "Unauthorized"));
  }
  req.user = value;
  next();
};

const generateAccessToken = (user) => {
  const payload = {
    name: user.name,
    nickname: user.nickname,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtAccessTokenExpiresIn });
};

const generateRefreshToken = (user) => {
  const payload = {
    name: user.name,
    nickname: user.nickname,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtRefreshTokenExpiresIn });
};

module.exports = {
  verifytokenInRedis,
  generateAccessToken,
  generateRefreshToken,
};
