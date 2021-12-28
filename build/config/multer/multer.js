"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multerConfig = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _uuid = require("uuid");

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _multerS = _interopRequireDefault(require("multer-s3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const storageTypes = {
  local: _multer.default.diskStorage({
    destination: (req, file, cb) => {
      cb(null, _path.default.resolve(__dirname, "..", "public", "uploads"));
    },
    filename: (req, file, cb) => {
      const fileName = `${(0, _uuid.v4)()}@${file.originalname}`;
      return cb(null, fileName);
    }
  }),
  s3: (0, _multerS.default)({
    s3: new _awsSdk.default.S3({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY
      },
      region: process.env.AWS_DEFAULT_REGION
    }),
    bucket: process.env.AWS_BUCKET,
    contentType: _multerS.default.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      const fileName = `${(0, _uuid.v4)()}@${file.originalname.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`;
      return cb(null, fileName);
    }
  })
};
const multerConfig = {
  dest: _path.default.resolve(__dirname, "..", "public", "uploads"),
  storage: storageTypes.s3,
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/pjpeg", "image/png", "image/gif", "image/jpg"];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."), null);
    }
  }
};
exports.multerConfig = multerConfig;