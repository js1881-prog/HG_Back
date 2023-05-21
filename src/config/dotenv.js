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
    "To start the application, you need Mysql uri (MYSQL_URI) environment variable"
  );
}

if (process.env.TYPEORM_SYNCHRONIZE == undefined) {
  throw new AppError(
    commonErrors.configError,
    500,
    "To start the application, you need typeORM environment variable"
  );
}

if (
  process.env.REDIS_PORT == undefined &&
  process.env.REDIS_HOST == undefined &&
  process.env.REDIS_URL == undefined &&
  process.env.REDIS_ACCESSTOKEN_EXPIRES_IN == undefined &&
  process.env.REDIS_REFRESHTOKEN_EXPIRES_IN == undefined
) {
  throw new AppError(
    commonErrors.configError,
    500,
    "To start the application, you need Redis environment variable"
  );
}

if (
  process.env.JWT_SECRET == undefined &&
  process.env.JWT_ACCESSTOKEN_EXPIRES_IN == undefined &&
  process.env.JWT_REFRESHTOKEN_EXPIRES_IN == undefined
) {
  throw new AppError(
    commonErrors.configError,
    500,
    "To start the application, you need Jwt environment variable"
  );
}

if (
  process.env.GOOGLE_OAUTH_CLIENT_ID == undefined &&
  process.env.GOOGLE_OAUTH_SECURE_PASSWORD == undefined &&
  process.env.GOOGLE_OAUTH_REDIRECT == undefined
) {
  throw new AppError(
    commonErrors.configError,
    500,
    "To start the application, you need Google_Oauth environment variable"
  );
}


if (
  // process.env.INSTAGRAM_OAUTH_CLIENT_ID == undefined &&
  // process.env.INSTAGRAM_OAUTH_CLIENT_SECRET == undefined &&
  // process.env.INSTAGRAM_OAUTH_REDIRECT == undefined
  process.env.MINIO_ACCESS_KEY === undefined &&
  process.env.MINIO_SECRET_ACCESS_KEY == undefined &&
  process.env.MINIO_END_POINT == undefined &&
  process.env.MINIO_PORT == undefined 
) {
  throw new AppError(
    commonErrors.configError,
    500,
    "To start the application, you need Minio environment variable"
  );
}

if (
  process.env.MAIL_ADMIN == undefined &&
  process.env.MAIL_ADMIN_PASSWORD == undefined &&
  process.env.MAIL_CODE_EXPIRES_IN == undefined
) {
  throw new AppError(
    commonErrors.configError,
    500,
    "To start the application, you need mail environment variable"
  );
}

module.exports = {
  applicationName: process.env.APPLICATION_NAME ?? "app",

  httpPort: parseInt(process.env.HTTP_PORT ?? "3000", 10),

  httpsPort: parseInt(process.env.HTTPS_PORT ?? "8080", 10),

  mysqlPort: process.env.MYSQL_PORT,

  mysqlHost: process.env.MYSQL_HOST,

  mysqlUser: process.env.MYSQL_USER,

  mysqlPassword: process.env.MYSQL_PASSWORD,

  mysqlDatabase: process.env.MYSQL_DATABASE,

  typeORMSynchronizeSetting: process.env.TYPEORM_SYNCHRONIZE,

  redisPort: process.env.REDIS_PORT,

  redisHost: process.env.REDIS_HOST,

  redisUri: process.env.REDIS_URL,

  jwtSecret: process.env.JWT_SECRET,

  jwtAccessTokenExpiresIn: process.env.JWT_ACCESSTOKEN_EXPIRES_IN,

  jwtRefreshTokenExpiresIn: process.env.JWT_REFRESHTOKEN_EXPIRES_IN,

  redisAccessTokenExpiresIn: process.env.REDIS_ACCESSTOKEN_EXPIRES_IN,

  redisRefreshTokenExpiresIn: process.env.REDIS_REFRESHTOKEN_EXPIRES_IN,

  googleOauthClientId: process.env.GOOGLE_OAUTH_CLIENT_ID,

  googleOauthSecurePassword: process.env.GOOGLE_OAUTH_SECURE_PASSWORD,

  minioAccessKeyId: process.env.MINIO_ACCESS_KEY,

  minioSecretAccessKey: process.env.MINIO_SECRET_ACCESS_KEY,

  minioPort: parseInt(process.env.MINIO_PORT),
 
  minioEndPoint: process.env.MINIO_END_POINT,
  
  googleOauthRedirect: process.env.GOOGLE_OAUTH_REDIRECT,

  // instagramOauthClientId: process.env.INSTAGRAM_OAUTH_CLIENT_ID,

  // instagramOauthSecurePassword: process.env.INSTAGRAM_OAUTH_CLIENT_SECRET,

  // instagramOauthRedirect: process.env.INSTAGRAM_OAUTH_REDIRECT,

  mailAdmin: process.env.MAIL_ADMIN,

  mailAdminPassword: process.env.MAIL_ADMIN_PASSWORD,

  mailCodeExpiresIn: process.env.MAIL_CODE_EXPIRES_IN,
};
