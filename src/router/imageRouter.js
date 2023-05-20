const express = require("express");
const imageController = require("../image/imageController");
const imageRouter = express.Router();
const extract = require("../middleware/extract");
const upload = require("../config/s3.js");

//imageRouter.post("/upload", imageController.postImage);
imageRouter.post("/minio", upload.single("image"), imageController.postMinio);
imageRouter.get("/detail", imageController.getImage);
imageRouter.get("/", imageController.getImages);
imageRouter.put("/", imageController.updateImage);
imageRouter.delete("/", imageController.deleteImage);

module.exports = imageRouter;
