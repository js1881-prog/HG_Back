const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const extractTokenFromBearerToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    const err = new AppError(
      commonErrors.authenticationError,
      401,
      "Unauthorized"
    );
    next(err);
  }
};

module.exports = extractTokenFromBearerToken;
