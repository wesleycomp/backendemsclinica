"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _bcryptjs = require("bcryptjs");
var _UsersRepository = require("../typeorm/repositories/UsersRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateUserService {
  async execute({
    name,
    email,
    password,
    perfil
  }) {
    const usersRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const emailExists = await usersRepository.findByEmail(email);
    if (emailExists) {
      throw new _AppError.default('Email addres already used');
    }
    const hashedPassword = await (0, _bcryptjs.hash)(password, 8);
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      perfil
    });
    await usersRepository.save(user);
    return user;
  }
}
var _default = exports.default = CreateUserService;