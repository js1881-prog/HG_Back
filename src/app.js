const express = require("express");
const http = require("http");
const AppError = require("./misc/AppError");
const commonErrors = require("./misc/commonErrors");
const logger = require("./util/logger/logger");
const cors = require("cors");
const { port } = require("./config/dotenv");
const typeORMDataSource = require("./util/connect/typeorm");
const bodyParser = require("body-parser");
const { swaggerUi, specs } = require("./config/swagger");
const { redis } = require("./util/connect/redis");
const passport = require("./middleware/passport/passport");
const apiRouter = require("./router");

const createApp = async () => {
  // DB Connection
  typeORMDataSource;
  await redis.connect();

  const expressApp = express();

  // express settings
  expressApp.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
  expressApp.use(bodyParser.urlencoded({ extended: true }));
  expressApp.use(bodyParser.json());
  expressApp.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs)); //swagger
  expressApp.use(passport.initialize());

  // Register API routers for version 1
  expressApp.use("/api/v1", apiRouter.v1);

  /**
   * @path {GET} /health
   * @description 서버의 상태를 확인하는 health check URL
   */
  expressApp.get("/health", (req, res, next) => {
    res.json({
      status: "OK",
    });
  });

  // Set URL Not found Handler
  expressApp.use((req, res, next) => {
    next(
      new AppError(
        commonErrors.resourceNotFoundError,
        404,
        "Resource not found"
      )
    );
  });

  // Set Error Handler
  expressApp.use((error, req, res, next) => {
    logger.info(error);
    res.statusCode = error.httpCode ?? 500;
    res.json({
      error: error.message,
      data: null,
    });
  });

  const server = http.createServer(expressApp);

  const app = {
    start() {
      server.listen(port);
      server.on("listening", () => {
        logger.info(`Server is listening on port ${port}`);
      });
    },
    stop() {
      logger.info("Stopping server operations");
      this.isShuttingDown = true;
      return new Promise((resolve, reject) => {
        server.close(async (error) => {
          if (error !== undefined) {
            logger.info(`- Failed to stop the HTTP server: ${error.message}`);
            reject(error);
          }
          this.isShuttingDown = false;
          resolve();
        });
      });
    },
    isShuttingDown: false, // flag to check if the server is in a stopped state
    _app: expressApp,
  };
  return app;
};

module.exports = createApp;
