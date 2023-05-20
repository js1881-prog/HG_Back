// comment service
// 댓글 생성, 조회, 수정, 삭제
// 대댓글 생성, 조회, 수정, 삭제
// 좋아요
const commentRepository = require("./commentRepository");
const logger = require("../util/logger/logger");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const commentService = {
  async createComment(comment) {
    try {
      const newComment = await commentRepository.create(comment);
      return newComment;
    } catch (error) {
      logger.error(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },
  async getCommentById(commentId) {
    try {
      const comment = await commentRepository.findById(commentId);
      if (!comment) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          404,
          "Comment not found"
        );
      }
      return comment;
    } catch (error) {
      logger.error(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },

  async getCommentsByTripId(tripId) {
    try {
      const comments = await commentRepository.findByTripId(tripId);
      return comments;
    } catch (error) {
      logger.error(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },

  async updateComment(commentId, updatedComment) {
    try {
      const comment = await commentRepository.update(commentId, updatedComment);
      if (!comment) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          404,
          "Comment not found"
        );
      }
      return comment;
    } catch (error) {
      logger.error(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },

  async getAllComment() {
    try {
      const allComment = await commentRepository.getAllComment();
      return allComment;
    } catch (error) {
      logger.error(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },
  async deleteComment(commentId) {
    try {
      const deletedComment = await commentRepository.delete(commentId);
      if (!deletedComment) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          404,
          "Comment not found"
        );
      }
    } catch (error) {
      logger.error(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },
};

module.exports = commentService;
