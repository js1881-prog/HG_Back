const express = require("express");
const commentController = require("../comment/commentController");
const userRouter = express.Router();

userRouter.post("/uploadcommnet", commentController.createComment);
userRouter.get("/getcomment", commentController.getCommentById);
userRouter.patch("/updatecomment", commentController.updateComment);
userRouter.get("/getallcomment", commentController.getAllComments);
userRouter.delete("/deletecomment", commentController.deleteComment);

module.exports = userRouter;
