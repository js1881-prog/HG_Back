const { minioAccessKeyId, minioSecretAccessKey } = require("../config/dotenv");
const Minio = require('minio');
const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKeyId: minioAccessKeyId,
  secretAccessKey: minioSecretAccessKey,
});

module.exports = minioClient;