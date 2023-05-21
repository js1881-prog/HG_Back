const { minioEndPoint, minioPort, minioAccessKeyId, minioSecretAccessKey } = require("../config/dotenv");
const Minio = require('minio');
const minioClient = new Minio.Client({
  endPoint: minioEndPoint,
  port: minioPort,
  useSSL: false,
  accessKeyId: minioAccessKeyId,
  secretAccessKey: minioSecretAccessKey,
});

module.exports = minioClient;