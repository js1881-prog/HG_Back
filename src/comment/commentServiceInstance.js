const commentService = require("./commentService.js");
const { Comment, CommentBuilder } = require("./Comment");
const commentRepository = require("./commentRepository");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const logger = require("../util/logger/logger");

const commentServiceInstance = commentService(
  Comment,
  CommentBuilder,
  commentRepository,
  AppError,
  commonErrors,
  logger
);

module.exports = commentServiceInstance;
