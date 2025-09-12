"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _UsersRepository = require("../typeorm/repositories/UsersRepository");
var _UsersTokensRepository = _interopRequireDefault(require("../typeorm/repositories/UsersTokensRepository"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class SendForgotPasswordEmailService {
  async execute({
    email
  }) {
    const usersRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const userTokensRepository = (0, _typeorm.getCustomRepository)(_UsersTokensRepository.default);
    const user = await usersRepository.findByEmail(email);
    if (!user) {
      throw new _AppError.default('User does not exist');
    }

    // console.log(user);

    const token = await userTokensRepository.generate(user.id);
    console.log(token);
  }
}
var _default = exports.default = SendForgotPasswordEmailService;