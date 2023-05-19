const commentService = require("./commentService");
const logger = require("../util/logger/logger");
const buildResponse = require("../util/response/buildResponse");

const commentController = {
  async createComment(req, res, next) {
    try {
      const { content, tripId } = req.body;
      const userId = req.user.id;
      const newComment = await commentService.createComment({
        user_id: userId,
        content,
        tripId,
      });
      res.status(201).json(buildResponse(newComment));
    } catch (error) {
      next(error);
    }
  },

  async getCommentById(req, res, next) {
    try {
      const commentId = req.params.commentId;
      const comment = await commentService.getCommentById(commentId);
      res.status(200).json(buildResponse(comment));
    } catch (error) {
      next(error);
    }
  },

  async updateComment(req, res, next) {
    try {
      const commentId = req.params.commentId;
      const updatedComment = req.body;
      const comment = await commentService.updateComment(
        commentId,
        updatedComment
      );
      res.status(200).json(buildResponse(comment));
    } catch (error) {
      next(error);
    }
  },

  async getAllComments(req, res, next) {
    try {
      const comments = await commentService.getAllComments();
      res.status(200).json(buildResponse(comments));
    } catch (error) {
      next(error);
    }
  },

  async deleteComment(req, res, next) {
    try {
      const commentId = req.params.commentId;
      await commentService.deleteComment(commentId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = commentController;
