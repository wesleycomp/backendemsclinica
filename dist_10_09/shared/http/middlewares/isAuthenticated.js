"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAuthenticated;
var _AppError = _interopRequireDefault(require("../../errors/AppError"));
var _jsonwebtoken = require("jsonwebtoken");
var _auth = _interopRequireDefault(require("../../../config/auth"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function isAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new _AppError.default('JWT token is missing');
  }

  //Bearer asdkfhskdfhaksdfalskdjfhsalk
  const [, token] = authHeader.split(' ');
  try {
    const decodeToken = (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret);
    const {
      sub
    } = decodeToken;
    //console.log(decodeToken);

    request.user = {
      id: sub
    };
    return next();
  } catch {
    throw new _AppError.default('Invalid JWT token');
  }
}