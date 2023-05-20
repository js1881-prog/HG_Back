const { jwtSecret } = require("../config/dotenv");
const jwt = require("jsonwebtoken");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const logger = require("../util/logger/logger");

// `res.locals accessToken, refreshToken ` represents an user token, and it is standardized for easy access to Redis.
// Storing the token in `res.locals accessToken, refreshToken` with a standardized name allows for easier access to the token
// when interacting with Redis. This approach helps to protect the meaningful information by
// using a standardized name, preventing potential vulnerabilities in other parts of the middleware chain.
const extract = {
  bearerToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      res.locals.accessToken = bearerToken;
      next();
    } else {
      const err = new AppError(
        commonErrors.authenticationError,
        401,
        "Unauthorized"
      );
      next(err);
    }
  },

  cookieToken(req, res, next) {
    const refreshToken = req.cookies["refreshToken"];
    if (typeof refreshToken !== "undefined") {
      res.locals.refreshToken = refreshToken;
      next();
    } else {
      const err = new AppError(
        commonErrors.authenticationError,
        401,
        "Unauthorized"
      );
      next(err);
    }
  },

  // after extract Bearer token
  decodeBearerToken(req, res, next) {
    const bearerToken = res.locals.accessToken;
    try {
      const decodedPayload = jwt.verify(bearerToken, jwtSecret);
      const user = decodedPayload;
      req.user = user;
      next();
    } catch (error) {
      logger.error(error);
      next(new AppError(commonErrors.authenticationError, 401, "Unauthorized"));
    }
  },
};

module.exports = extract;
