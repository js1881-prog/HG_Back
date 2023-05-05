const dotenv = require("dotenv");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const logger = require("../util/logger/logger");

process.env.NODE_ENV = process.env.NODE_ENV ?? "development";
logger.info(
  `Starting the application server in the following environment : ${process.env.NODE_ENV}`
);

const envFound = dotenv.config();

if (envFound.error) {
  throw new AppError(
    commonErrors.configError,
    "Couldn't find .env file",
    false
  );
}

if (
  process.env.MYSQL_PORT === undefined &&
  process.env.MYSQL_HOST == undefined &&
  process.env.MYSQL_USER == undefined &&
  process.env.MYSQL_PASSWORD == undefined &&
  process.env.MYSQL_DATABASE == undefined
) {
  throw new AppError(
    commonErrors.configError,
    500,
    "To start the application, you need MYSQL DB URI (MYSQL_URI) environment variable"
  );
}

module.exports = {
  applicationName: process.env.APPLICATION_NAME ?? "app",

  port: parseInt(process.env.PORT ?? "3000", 10),

  mysqlPort: process.env.MYSQL_PORT,

  mysqlHost: process.env.MYSQL_HOST,

  mysqlUser: process.env.MYSQL_USER,

  mysqlPassword: process.env.MYSQL_PASSWORD,

  mysqlDatabase: process.env.MYSQL_DATABASE,
};
