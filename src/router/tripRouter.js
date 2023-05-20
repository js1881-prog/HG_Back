const express = require("express");
const tripController = require("../trip/tripController");
const jwtUtils = require("../middleware/jwt/jwtUtils");
const passport = require("../middleware/passport/passport");
const extract = require("../middleware/extract");
const tripRouter = express.Router();
const fs = require('fs');
var multer = require('multer');

fs.readdir("uploads", (error) => {
  if (error) {
    console.error("uploads폴더가 없어 uploads폴더를 생성합니다.");
    fs.mkdirSync("uploads/images");
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {
          cb(null, 'uploads/images')
      } else if (file.mimetype == "application/pdf" || file.mimetype == "application/txt" || file.mimetype == "application/octet-stream") {
          cb(null, 'uploads/texts')
      }
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname)
  }
})

const upload = multer({ storage: storage })

tripRouter.post("/", upload.single('thumbnail'), tripController.postTrip);

module.exports = tripRouter;