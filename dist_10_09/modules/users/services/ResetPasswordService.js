"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _UsersRepository = _interopRequireDefault(require("../typeorm/repositories/UsersRepository"));
var _UsersTokensRepository = _interopRequireDefault(require("../typeorm/repositories/UsersTokensRepository"));
var _dateFns = require("date-fns");
var _bcryptjs = require("bcryptjs");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ResetPasswordService {
  async execute({
    token,
    password
  }) {
    const usersRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const userTokensRepository = (0, _typeorm.getCustomRepository)(_UsersTokensRepository.default);
    const userToken = await userTokensRepository.findByToken(token);
    if (!userToken) {
      throw new _AppError.default('User Token not exist');
    }
    const user = await usersRepository.findById(userToken.user_id);
    if (!user) {
      throw new _AppError.default('User not exist');
    }
    const tokenCreatAt = userToken.created_at;
    const compareDate = (0, _dateFns.addHours)(tokenCreatAt, 2);
    if ((0, _dateFns.isAfter)(Date.now(), compareDate)) {
      throw new _AppError.default('Token expired.');
    }
    user.password = await (0, _bcryptjs.hash)(password, 8);
    await usersRepository.save(user);
  }
}
var _default = exports.default = ResetPasswordService;