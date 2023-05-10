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
  entities: [join(__dirname, "../../sample/sample.entity.js")],
});

typeORMDataSource
  .initialize()
  .then(() => {
    logger.info("typeORM has been initialized");
  })
  .catch((err) => {
    logger.error(`Failed to initialize typeORM Data Source: ${err.message}`);
  });

module.exports = typeORMDataSource;
