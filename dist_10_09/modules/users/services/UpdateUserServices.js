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
class UpdateUserServices {
  async execute({
    id,
    name,
    email,
    password,
    perfil
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const usersRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const user = await usersRepository.findOne(id);
    if (!user) {
      throw new _AppError.default('Usuario não encontrada');
    }
    user.password = await (0, _bcryptjs.hash)(password, 8);
    user.name = name;
    user.email = email;
    user.perfil = perfil;
    await usersRepository.save(user);
    return user;
  }
}
var _default = exports.default = UpdateUserServices;