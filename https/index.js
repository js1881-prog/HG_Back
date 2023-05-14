const fs = require("fs");
const path = require('path');

const certPath = path.join(__dirname, "./", "cert.crt");
const keyPath = path.join(__dirname, "./", "cert.key");

const httpsOptions = {
  // key: fs.readFileSync(keyPath),
  // cert: fs.readFileSync(certPath),
};

module.exports = httpsOptions;