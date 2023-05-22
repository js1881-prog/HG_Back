const logger = require("../logger/logger");
const { DataSource } = require("typeorm");
const { join } = require("path");
const { typeORMSynchronizeSetting } = require("../../config/dotenv");

const {
  mysqlHost,
  mysqlPort,
  mysqlUser,
  mysqlPassword,
  mysqlDatabase,
} = require("../../config/dotenv");

const typeORMDataSource = new DataSource({
  type: "postgres",
  host: mysqlHost,
  port: mysqlPort,
  username: mysqlUser,
  password: mysqlPassword,
  database: mysqlDatabase,
  synchronize: typeORMSynchronizeSetting,
  logging: false,
  extra: {
    ssl: true,
  },
  entities: [
    join(__dirname, "../../user/user.entity.js"),
    join(__dirname, "../../trip/trip.entity.js"),
    join(__dirname, "../../tripviews/tripviews.entity.js"),
    join(__dirname, "../../schedule/schedule.entity.js"),
    join(__dirname, "../../image/image.entity.js"),
    join(__dirname, "../../comment/comment.entity.js"),
  ],
});

typeORMDataSource
  .initialize()
  .then(() => {
    logger.info("typeORM has been initialized");
  })
  .catch(err => {
    logger.error(`Failed to initialize typeORM Data Source: ${err.message}`);
  });

module.exports = typeORMDataSource;