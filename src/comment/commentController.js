const commentService = require("./commentService");

const buildResponse = require("../util/response/buildResponse");

const commentController = {
  async createComment(req, res, next) {
    try {
      const { content, tripId } = req.body;
      const { id: userId } = req.user;
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

  async addLikeToComment(req, res, next) {
    try {
      const commentId = req.params.commentId;
      const { id: userId } = req.user;
      const updatedComment = await commentService.addLikeToComment(
        commentId,
        userId
      );

      res.status(200).json(buildResponse(updatedComment));
    } catch (error) {
      next(error);
    }
  },

  async removeLikeFromComment(req, res, next) {
    try {
      const commentId = req.params.commentId;
      const { id: userId } = req.user;
      const updatedComment = await commentService.removeLikeFromComment(
        commentId,
        userId
      );

      res.status(200).json(buildResponse(updatedComment));
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
  async getCommentsByTripId(req, res, next) {
    try {
      const tripId = req.params.tripId;
      const comments = await commentService.getCommentsByTripId(tripId);

      res.status(200).json(buildResponse(comments));
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

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = commentController;
