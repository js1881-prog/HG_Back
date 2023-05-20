const express = require("express");
const http = require("http");
const AppError = require("./misc/AppError");
const commonErrors = require("./misc/commonErrors");
const logger = require("./util/logger/logger");
const cors = require("cors");
const { httpPort, httpsPort } = require("./config/dotenv");
const typeORMDataSource = require("./util/connect/typeorm");
const bodyParser = require("body-parser");
const { swaggerUi, specs } = require("./config/swagger");
const { redis } = require("./util/connect/redis");
const passport = require("./middleware/passport/passport");
const apiRouter = require("./router");
const cookieParser = require("cookie-parser");
const https = require("https");
const httpsOptions = require("../https/index");

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
  expressApp.use(cookieParser());
  expressApp.use(
    "/swagger",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  ); //swagger
  expressApp.use(passport.initialize());

  expressApp.use("/api/v1", apiRouter.v1);

  expressApp.use(express.static('public'));

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
    logger.error(error);
    res.statusCode = error.httpCode ?? error.status ?? 500;
    res.json({
      error: error.message,
      data: null,
    });
  });

  const httpServer = http.createServer(expressApp);

  // TODO = The product httpServer needs to change the httpsServer
  // const httpsServer = https.createServer(httpsOptions, expressApp);

  const app = {
    start() {
      httpServer.listen(httpPort);
      httpServer.on("listening", () => {
        logger.info(`HTTP Server is listening on port ${httpPort}`);
      });

      // httpsServer.listen(httpsPort);
      // httpServer.on("listening", () => {
      //   logger.info(`HTTPS Server is listening on port ${httpsPort}`);
      // });
    },
    stop() {
      logger.info("Stopping server operations");
      this.isShuttingDown = true;
      return new Promise((resolve, reject) => {
        httpServer.close(async (error) => {
          if (error !== undefined) {
            logger.error(`- Failed to stop the server: ${error.message}`);
            reject(error);
          }
          this.isShuttingDown = false;
          resolve();
        });
        // httpsServer.close(async (error) => {
        //   if (error !== undefined) {
        //     logger.error(`- Failed to stop the server: ${error.message}`);
        //     reject(error);
        //   }
        //   this.isShuttingDown = false;
        //   resolve();
        // });
      });
    },
    isShuttingDown: false, // flag to check if the httpServer is in a stopped state
    _app: expressApp,
  };
  return app;
};

module.exports = createApp;
