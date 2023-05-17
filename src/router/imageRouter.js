const express = require("express");
const imageController = require("../image/imageController");
const imageRouter = express.Router();
//const upload = require("../config/s3.js");

imageRouter.post("/upload", imageController.postImage);
imageRouter.get("/detail", imageController.getImage);
imageRouter.get("/", imageController.getImages);
imageRouter.put("/", imageController.updateImage);
imageRouter.delete("/", imageController.deleteImage);

module.exports = imageRouter;
