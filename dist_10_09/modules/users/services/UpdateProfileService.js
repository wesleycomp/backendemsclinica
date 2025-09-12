"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _bcryptjs = require("bcryptjs");
var _typeorm = require("typeorm");
var _UsersRepository = require("../typeorm/repositories/UsersRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UpdateProfileService {
  async execute({
    user_id,
    name,
    email,
    password,
    old_password
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const usersRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new _AppError.default('User not found.');
    }
    const userUpdateEmail = await usersRepository.findByEmail(email);
    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new _AppError.default('Esse email ja esta sendo utilizado por outro usuario');
    }
    if (password && !old_password) {
      throw new _AppError.default('Nao enviou a senha antiga!!');
    }
    if (password && old_password) {
      const checkOldPassword = await (0, _bcryptjs.compare)(old_password, user.password);
      if (!checkOldPassword) {
        throw new _AppError.default('Senha antiga não confere!!');
      }
      user.password = await (0, _bcryptjs.hash)(password, 8);
    }
    user.name = name;
    user.email = email;
    await usersRepository.save(user);
    return user;
  }
}
var _default = exports.default = UpdateProfileService;