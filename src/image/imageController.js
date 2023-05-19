const logger = require("../util/logger/logger");
const buildResponse = require("../util/response/buildResponse");
const imageService = require("./imageService.js");

//MINIO 연결하기
const Minio = require('minio');
const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKeyId: "HWUWrIHoU8eVGViF",
  secretAccessKey: "oJEPEIzkV0PcEnbS2c30loAncatAJ02p",
});

const imageController = {
  async postImage(req, res, next) {
    try {
      const { use, number } = req.body;
      const url = "http://abcdefg.com/images/289249823.jpg";
      const name = "이미지 이름";
      const imageData = {
        user_id: 3,
        image_url: url,
        image_name: name,
        use,
        number,
      };
      const image = await imageService.createImage(imageData);
      res.status(200).json(buildResponse(null, image));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  async postMinio(req, res, next) {
    try {
      const bucketName = 'image';
      const objectName = Date.now() + req.file.originalname;
      const filePath = req.file.path; // 업로드된 파일의 임시 경로

      minioClient.fPutObject(bucketName, objectName, filePath, function(err, etag) {
        if (err) {
          return next(err); 
        }
        console.log('파일 업로드 완료. ETag:', etag);
        res.status(200).send('파일 업로드 완료');
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  //get
  async getMinio(req, res, next) {
    try {

      minioClient.getObject(bucketName, objectName, (err, dataStream) => {
        if (err) {
          console.error('Error getting object:', err);
        } else {
          dataStream.on('data', (chunk) => {
            console.log('Received chunk of data:', chunk);
          });
    
          dataStream.on('end', () => {
            console.log('Object retrieval completed');
          });
          dataStream.on('error', (err) => {
            console.error('Error while receiving data:', err);
          });
        }
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  async getImage(req, res, next) {
    try {
      const imageId = req.query.id;
      const image = await imageService.getImage(imageId);
      res.status(200).json(buildResponse(null, image));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  async getImages(req, res, next) {
    try {
      const image = await imageService.getAllImages();
      res.status(200).json(buildResponse(null, image));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  async updateImage(req, res, next) {
    try {
      const imageId = req.query.id;
      const { url, name, use, number } = req.body;
      const imageData = {
        url,
        name,
        use,
        number
      };
      const image = await imageService.updateImage(imageId, imageData);
      res.status(200).json(buildResponse(null, image));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  async deleteImage(req, res, next) {
    try {
      const imageId = req.query.id;
      const image = await imageService.deleteImage(imageId);
      res.status(200).json(buildResponse(null, image));
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
};

module.exports = imageController;
