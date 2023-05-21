const express = require("express");
const imageController = require("../image/imageController");
const imageRouter = express.Router();
const extract = require("../middleware/extract");
const upload = require("../config/s3.js");

//imageRouter.post("/upload", imageController.postImage);
imageRouter.post("/minio", upload.single("image"), imageController.postMinio);
imageRouter.get("/detail", imageController.getImage);

/**
 * @swagger
 * /api/getImage:
 *   get:
 *     summary: 이미지 가져오기
 *     description: 이미지 ID를 사용하여 이미지를 가져옵니다.
 *     parameters:
 *       - in: query
 *         name: id
 *         description: 이미지 ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: 이미지 가져오기 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 image:
 *                   type: string
 *                   description: 이미지 데이터
 *               example:
 *                 image: /path/to/image.jpg
 *       '400':
 *         description: 잘못된 요청
 *       '500':
 *         description: 서버 오류
 */

imageRouter.get("/", imageController.getImages);
imageRouter.put("/", imageController.updateImage);
imageRouter.delete("/", imageController.deleteImage);

module.exports = imageRouter;
