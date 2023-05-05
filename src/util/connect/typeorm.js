const logger = require("../logger/logger");
const path = require("path");
const { DataSource } = require("typeorm");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const typeORMDataSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  logging: false,
  entities: [__dirname + "/../../entities/*.entity.js"],
});

typeORMDataSource.initialize().then(() => {
  logger.info("typeORM Data Source has been initialized");
});

module.exports = typeORMDataSource;
