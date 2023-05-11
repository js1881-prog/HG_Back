const logger = require("../logger/logger");
const { DataSource } = require("typeorm");
const { join } = require("path");

const {
  mysqlHost,
  mysqlPort,
  mysqlUser,
  mysqlPassword,
  mysqlDatabase,
} = require("../../config/dotenv");

const typeORMDataSource = new DataSource({
  type: "mysql",
  host: mysqlHost,
  port: mysqlPort,
  username: mysqlUser,
  password: mysqlPassword,
  database: mysqlDatabase,
  synchronize: true,
  logging: false,
  entities: [
    join(__dirname, "../../comment/comment.entity.js"),
    join(__dirname, "../../user/user.entity.js"),
    join(__dirname, "../../trip/trip.entity.js"),
    join(__dirname, "../../schedule/schedule.entity.js"),
    join(__dirname, "../../subscription/subscription.entity.js"),
    join(__dirname, "../../image/image.entity.js"),
  ],
});

typeORMDataSource.initialize().then(() => {
  logger.info("typeORM Data Source has been initialized");
});

module.exports = typeORMDataSource;
