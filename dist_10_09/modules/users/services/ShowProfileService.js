"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _UsersRepository = require("../typeorm/repositories/UsersRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ShowProfileService {
  async execute({
    user_id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const usersRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new _AppError.default('User not found.');
    }
    return user;
  }
}
var _default = exports.default = ShowProfileService;