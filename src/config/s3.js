const multer = require('multer');
const multerS3 = require('multer-s3');
//const AWS = require('aws-sdk');
const Minio = require('minio');
//const { S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY } = require("../../config/dotenv");

const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const upload = multer({
  storage: multerS3({
    s3: minioClient,
    bucket: 'trip',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

module.exports = upload;
