// db 검색 쿼리 생성
const typeORMDataSource = require("../util/connect/typeorm");
const Comment = require("../comment/comment.entity");

const logger = require("../util/logger/logger");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const commentRepository = {
  async create(comment) {
    // create new comment
    try {
      const repository = typeORMDataSource.getRepository(Comment);
      const newComment = repository.create(comment);
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

  async findById(commentId) {
    // find by comment id
    try {
      const repository = typeORMDataSource.getRepository(Comment);
      const comment = await repository.findOne({ id: commentId });
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

  async findByTripId(tripId) {
    // find by trip id
    try {
      const repository = typeORMDataSource.getRepository(Comment);
      const comments = await repository.find({ where: { trip_id: tripId } });
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

  async update(commentId, updatedComment) {
    // update comment
    try {
      const repository = typeORMDataSource.getRepository(Comment);
      const commentToUpdate = await repository.findOne(commentId);
      if (!commentToUpdate) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          404,
          "Comment Not Found"
        );
      }
      await repository.update(commentId, updatedComment);
      return commentToUpdate;
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },

  async getAllComment() {
    // get all comment
    try {
      const repository = typeORMDataSource.getRepository(Comment);
      const allComment = await repository.find();
      return allComment;
    } catch (error) {
      logger.info(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        "Internal Server Error"
      );
    }
  },
  async delete(commentId) {
    // delete comment
    try {
      const repository = typeORMDataSource.getRepository(Comment);
      const commentToDelete = await repository.findOne(commentId);
      if (!commentToDelete) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          404,
          "Comment Not Found"
        );
      }
      await commentRepository.remove(commentToDelete);
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
