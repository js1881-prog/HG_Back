const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const Minio = require('minio');
//const { S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY } = require("../../config/dotenv");

// AWS SDK 구성
// const s3 = new AWS.S3({
//   endpoint: 'localhost',
//   accessKeyId: "",
//   secretAccessKey: "",
//   s3ForcePathStyle: true, 
//   signatureVersion: 'v4' 
// });

// const upload = multer({
//   storage: multerS3({
//     s3: minioClient,
//     bucket: 'trip',
//     acl: 'public-read',
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     key: function (req, file, cb) {
//       cb(null, `${Date.now()}_${file.originalname}`);
//     },
//   }),
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
