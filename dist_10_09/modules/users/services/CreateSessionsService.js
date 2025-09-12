"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _bcryptjs = require("bcryptjs");
var _auth = _interopRequireDefault(require("../../../config/auth"));
var _UsersRepository = require("../typeorm/repositories/UsersRepository");
var _jsonwebtoken = require("jsonwebtoken");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateSessionsService {
  async execute({
    email,
    password
  }) {
    const usersRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const user = await usersRepository.findByEmail(email);
    if (!user) {
      throw new _AppError.default('Incorrect email/passwaord', 401);
    }
    const passwordConfirmed = await (0, _bcryptjs.compare)(password, user.password);
    if (!passwordConfirmed) {
      throw new _AppError.default('Incorrect email/passwaord', 401);
    }
    const token = (0, _jsonwebtoken.sign)({}, _auth.default.jwt.secret, {
      subject: user.id,
      expiresIn: _auth.default.jwt.expiresIn
    });
    return {
      user,
      token
    };
  }
}
var _default = exports.default = CreateSessionsService;