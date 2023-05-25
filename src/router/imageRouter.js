const express = require("express");
const imageController = require("../image/imageController");
const imageRouter = express.Router();
const extract = require("../middleware/extract");
const upload = require("../config/s3.js");

/**
 * @swagger
 * tags:
 *   name: Image
 *   description: API for managing image
 */

/**
 * @swagger
 * /api/v1/images/minio:
 *   post:
 *     summary: Create a new image
 *     tags: [image]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image_url:
 *                 type: string
 *               image_name:
 *                 type: string
 *                 format: date-time
 *             example:
 *               image_url: "image/16847499509811630652987056_0.jpg"
 *               image_name: "16847499509811630652987056_0.jpg "
 *     responses:
 *       200:
 *         description: Successfully created the image
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 image:
 *                   type: object
 *                   properties:
 *                     image_url:
 *                       type: string
 *                     image_name:
 *                       type: string
 *                   example:
 *                     image_url: "image/16847499509811630652987056_0.jpg"
 *                     image_name: "16847499509811630652987056_0.jpg "
 */

/**
 * @swagger
 * /api/v1/images:
 *   put:
 *     summary: Update a image
 *     tags: [image]
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID of the image to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image_url:
 *                 type: string
 *               image_name:
 *                 type: string
 *             example:
 *                 image_url: "image/16847499509811630652987056_0.jpg"
 *                 image_name: "16847499509811630652987056_0.jpg "
 *     responses:
 *       200:
 *         description: Successfully updated the image
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 image:
 *                   type: object
 *                   properties:
 *                     image_url:
 *                       type: string
 *                     image_name:
 *                       type: string
 *                   example:
 *                     image_url: "image/16847499509811630652987056_0.jpg"
 *                     image_name: "16847499509811630652987056_0.jpg " 
 *
 *   get:
 *     summary: Get all images
 *     tags: [image]
 *     responses:
 *       200:
 *         description: Successfully retrieved the image
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 image_url:
 *                   type: string
 *                 image_name:
 *                   type: string
 *               example:
 *                 - image_url: "image/16847499509811630652987056_0.jpg"
 *                   image_name: "16847499509811630652987056_0.jpg"
 *                 - image_url: "image/1684676595626fsd.jpeg"
 *                   image_name: "1684676595626fsd.jpeg"
 *   delete:
 *     summary: Delete a image
 *     tags: [image]
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID of the image to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the image
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "image deleted successfully"
 */

/**
 * @swagger
 * /api/v1/images/detail:
*   get:
 *     summary: Get a specific image
 *     tags: [image]
 *     description: 이미지 ID를 사용, 이미지를 가져오기.
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
 *                 image_url:
 *                   type: string
 *                 image_name:
 *                   type: string
 *               example:
 *                 image_url: "image/16847499509811630652987056_0.jpg"
 *                 image_name: "16847499509811630652987056_0.jpg " 
 *       '400':
 *         description: 잘못된 요청
 *       '500':
 *         description: 서버 오류
 */

imageRouter.post("/minio", upload.single("image"), imageController.postMinio);
imageRouter.get("/detail", imageController.getImage);
imageRouter.get("/", imageController.getImages);
imageRouter.put("/", imageController.updateImage);
imageRouter.delete("/", imageController.deleteImage);

module.exports = imageRouter;
