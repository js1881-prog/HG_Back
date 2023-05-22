const commentRepository = require("./commentRepository");
const logger = require("../util/logger/logger");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const commentService = {
  /**
   * Create a new comment
   * @param {Object} comment - 새로운 댓글 정보
   * @returns {Promise<Object>} - 생성된 댓글 정보
   * @throws {AppError} - 데이터베이스 에러가 발생한 경우
   */
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
  /**
   * Get a comment by its ID
   * @param {string} commentId - 댓글 ID
   * @returns {Promise<Object>} - 댓글 정보
   * @throws {AppError} - 댓글이 존재하지 않거나 데이터베이스 에러가 발생한 경우
   */
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
  /**
   * Get comments by trip ID
   * @param {string} tripId - 여행 ID
   * @returns {Promise<Array>} - 여행에 해당하는 댓글 목록
   * @throws {AppError} - 데이터베이스 에러가 발생한 경우
   */
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
  /**
   * Update a comment
   * @param {string} commentId - 댓글 ID
   * @param {Object} updatedComment - 업데이트된 댓글 정보
   * @returns {Promise<Object>} - 업데이트된 댓글 정보
   * @throws {AppError} - 댓글이 존재하지 않거나 데이터베이스 에러가 발생한 경우
   */
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
  /**
   * Get all comments
   * @returns {Promise<Array>} - 모든 댓글 목록
   * @throws {AppError} - 데이터베이스 에러가 발생한 경우
   */
  async getAllComments() {
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
  /**
   * Delete a comment
   * @param {string} commentId - 댓글 ID
   * @throws {AppError} - 댓글이 존재하지 않거나 데이터베이스 에러가 발생한 경우
   */
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
