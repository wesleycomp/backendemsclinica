"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const uploadFolder = _path.default.resolve(__dirname, '..', '..', 'uploads');
var _default = exports.default = {
  directory: uploadFolder,
  storage: _multer.default.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      const fileHash = _crypto.default.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;
      callback(null, filename);
    }
  })
};