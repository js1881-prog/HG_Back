const typeORMDataSource = require("../util/connect/typeorm");
const Comment = require("../comment/comment.entity");
const User = require("../user/user.entity");

const logger = require("../util/logger/logger");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const repository = typeORMDataSource.getRepository(Comment);

const commentRepository = {
  /**
   * Creates a new comment.
   * @param {Object} comment - The comment object.
   * @returns {Object} The created comment.
   */
  async create(comment) {
    try {
      const newComment = repository.create({
        ...comment,
        likes: 0,
        liked_by: [],
      });

      await repository.save(newComment);
      return newComment;
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },

  /**
   * Adds a like to a comment.
   * @param {string} commentId - The ID of the comment to add a like to.
   * @param {string} userId - The ID of the user who liked the comment.
   * @returns {Object} The updated comment.
   */
  async addLike(commentId, userId) {
    try {
      const comment = await repository.findOne(commentId);
      if (!comment) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          404,
          "Comment Not Found"
        );
      }

      if (comment.liked_by.includes(userId)) {
        throw new AppError(commonErrors.badRequestError, 400, "Already Liked");
      }

      comment.likes += 1;
      comment.liked_by.push(userId);

      const updatedComment = await repository.save(comment);
      return updatedComment;
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },

  /**
   * Removes a like from a comment.
   * @param {string} commentId - The ID of the comment to remove the like from.
   * @param {string} userId - The ID of the user who unliked the comment.
   * @returns {Object} The updated comment.
   */
  async removeLike(commentId, userId) {
    try {
      const comment = await repository.findOne(commentId);
      if (!comment) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          404,
          "Comment Not Found"
        );
      }

      if (!comment.liked_by.includes(userId)) {
        throw new AppError(commonErrors.badRequestError, 400, "Not Liked");
      }

      comment.likes -= 1;
      comment.liked_by = comment.liked_by.filter((id) => id !== userId);

      const updatedComment = await repository.save(comment);
      return updatedComment;
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },

  /**
   * Finds a comment by comment ID.
   * @param {string} commentId - The ID of the comment to find.
   * @returns {Object} The found comment.
   */
  async findById(commentId) {
    try {
      const comment = await repository.findOne(
        { id: commentId },
        { relations: ["user", "trip", "parentComment", "childComments"] }
      );
      return comment;
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },
  /**
   * Finds comments by trip ID.
   * @param {string} tripId - The ID of the trip to find comments for.
   * @returns {Array} An array of comments.
   */
  async findByTripId(tripId) {
    try {
      const comments = await repository.find({
        where: { trip_id: tripId },
        relations: ["user", "trip", "parentComment", "childComments"],
      });
      return comments;
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },
  /**
   * Updates a comment by comment ID.
   * @param {string} commentId - The ID of the comment to update.
   * @param {Object} updatedComment - The updated comment object.
   * @returns {Object} The updated comment.
   */
  async update(commentId, updatedComment) {
    try {
      const commentToUpdate = await repository.findOne(commentId);
      if (!commentToUpdate) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          404,
          "Comment Not Found"
        );
      }
      await repository.update(commentId, updatedComment);
      const updated = await repository.average(commentId);
      return updated;
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },
  /**
   * Retrieves all comments.
   * @returns {Array} An array of comments.
   */
  async getAllComments() {
    try {
      const allComments = await repository.find({
        relations: ["user", "trip", "parentComment", "childComments"],
      });
      return allComments;
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },
  /**
   * Deletes a comment by comment ID.
   * @param {string} commentId - The ID of the comment to delete.
   */
  async delete(commentId) {
    try {
      const commentToDelete = await repository.findOne(commentId);
      if (!commentToDelete) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          404,
          "Comment Not Found"
        );
      }
      await repository.remove(commentToDelete);
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },
};

module.exports = commentRepository;
