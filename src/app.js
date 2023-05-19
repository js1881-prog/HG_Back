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
const cookieParser = require("cookie-parser");

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

  // expressApp.get("/test", async (req, res, next) => {
  //   try {
  //     //res.sendFile(__dirname + "/trip.html");
  //     //res.sendFile(__dirname + "/image.html");
  //     res.sendFile(__dirname + "/minio.html");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });
  
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
            logger.error(`- Failed to stop the HTTP server: ${error.message}`);
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
