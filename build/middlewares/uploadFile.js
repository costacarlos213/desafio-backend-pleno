"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFileMiddleware = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _util = _interopRequireDefault(require("util"));

var _multer2 = require("../config/multer/multer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const uploadFile = (0, _multer.default)(_multer2.multerConfig).any();

const uploadFileMiddleware = _util.default.promisify(uploadFile);

exports.uploadFileMiddleware = uploadFileMiddleware;