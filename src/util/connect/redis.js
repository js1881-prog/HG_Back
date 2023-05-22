const Redis = require("redis");
const { redisUrl } = require("../../config/dotenv");
const logger = require("../logger/logger");
const { promisify } = require("util");

const redis = Redis.createClient({
  url: redisUrl,
});

const setexAsync = promisify(redis.setEx).bind(redis);
const getallAsync = promisify(redis.hGetAll).bind(redis);
const getAsync = promisify(redis.getEx).bind(redis);
const hgetAsync = promisify(redis.hGet).bind(redis);
const asmembers = promisify(redis.sMembers).bind(redis);
const ahkeys = promisify(redis.hKeys).bind(redis);
const expireAsync = promisify(redis.expire).bind(redis);
const delAsync = promisify(redis.del).bind(redis);

redis.on("ready", () => {
  logger.info("Redis has been initialized");
});

redis.on("end", () => {
  logger.info("Redis client disconnected");
});

redis.on("error", err => {
  logger.error("Redis error:", err);
});

module.exports = {
  redis,
  setexAsync,
  getallAsync,
  getAsync,
  hgetAsync,
  asmembers,
  ahkeys,
  expireAsync,
  delAsync,
};