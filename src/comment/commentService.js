const commentRepository = require("./commentRepository");
const imageService = require("../image/imageService");

const logger = require("../util/logger/logger");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const commentService = {
  /**
   * Create a new comment
   * @param {Object} comment - The new comment information.
   * @returns {Promise<Object>} - The created comment information.
   * @throws {AppError} - If a database error occurs.
   */
  async createComment(comment) {
    try {
      const newComment = await commentRepository.create(comment);
      const userProfileImage = await imageService.getImage(
        comment.user.userProfileImage
      );
      newComment.user.userProfileImage = userProfileImage;

      newComment.likes = 0;
      newComment.liked_by = [];

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
   * @param {string} commentId - The comment ID.
   * @returns {Promise<Object>} - The comment information.
   * @throws {AppError} - If the comment does not exist or a database error occurs.
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
      const userProfileImage = await imageService.getImage(
        comment.user.userProfileImage
      );
      comment.user.userProfileImage = userProfileImage;

      comment.nickname = comment.user.nickname;

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
   * @param {string} tripId - The trip ID.
   * @returns {Promise<Array>} - The list of comments for the trip.
   * @throws {AppError} - If a database error occurs.
   */
  async getCommentsByTripId(tripId) {
    try {
      const comments = await commentRepository.findByTripId(tripId);
      for (let comment of comments) {
        const userProfileImage = await imageService.getImage(
          comment.user.userProfileImage
        );
        comment.user.userProfileImage = userProfileImage;

        comment.nickname = comment.user.nickname;
      }

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
   * @param {string} commentId - The comment ID.
   * @param {Object} updatedComment - The updated comment information.
   * @returns {Promise<Object>} - The updated comment information.
   * @throws {AppError} - If the comment does not exist or a database error occurs.
   */
  async updateComment(commentId, updatedComment) {
    try {
      await commentRepository.update(commentId, updatedComment);
      const updated = await commentRepository.findById(commentId);
      return updated;
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
   * @returns {Promise<Array>} - The list of all comments.
   * @throws {AppError} - If a database error occurs.
   */
  async getAllComments() {
    try {
      const allComments = await commentRepository.getAllComments();
      for (let comment of allComments) {
        const userProfileImage = await imageService.getImage(
          comment.user.userProfileImage
        );
        comment.user.userProfileImage = userProfileImage;

        comment.nickname = comment.user.nickname;
      }

      return allComments;
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
   * @param {string} commentId - The comment ID.
   * @throws {AppError} - If the comment does not exist or a database error occurs.
   */
  async deleteComment(commentId) {
    try {
      await commentRepository.delete(commentId);
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
   * Add a like to a comment
   * @param {string} commentId - The ID of the comment.
   * @param {string} userId - The ID of the user who liked the comment.
   * @returns {Promise<Object>} - The updated comment information.
   * @throws {AppError} - If the comment does not exist or a database error occurs.
   */
  async addLikeToComment(commentId, userId) {
    try {
      const comment = await commentRepository.findById(commentId);
      if (!comment) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          404,
          "Comment not found"
        );
      }

      if (!comment.liked_by.includes(userId)) {
        comment.likes += 1;
        comment.liked_by.push(userId);
      }

      await commentRepository.update(commentId, comment);

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
   * Remove a like from a comment
   * @param {string} commentId - The ID of the comment.
   * @param {string} userId - The ID of the user who wants to remove the like.
   * @returns {Promise<Object>} - The updated comment information.
   * @throws {AppError} - If the comment does not exist or a database error occurs.
   */
  async removeLikeFromComment(commentId, userId) {
    try {
      const comment = await commentRepository.findById(commentId);
      if (!comment) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          404,
          "Comment not found"
        );
      }

      if (comment.liked_by.includes(userId)) {
        comment.likes -= 1;
        comment.liked_by = comment.liked_by.filter((id) => id !== userId);
      }

      await commentRepository.update(commentId, comment);

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
};

module.exports = commentService;
