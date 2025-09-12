"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _UsersRepository = require("../typeorm/repositories/UsersRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ShowUserService {
  async execute({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const userRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const user = await userRepository.findOne(id);
    if (!user) {
      throw new _AppError.default('Usuario não encontrado');
    }
    return user;
  }
}
var _default = exports.default = ShowUserService;