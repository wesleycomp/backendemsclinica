"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
var _UsersRepository = require("../typeorm/repositories/UsersRepository");
var _upload = _interopRequireDefault(require("../../../config/upload"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UpdateUserAvatarService {
  async execute({
    user_id,
    avatarFilename
  }) {
    const usersRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new _AppError.default('User not Found');
    }
    if (user.avatar) {
      //apaga arquivo

      const userAvatarFilePath = _path.default.join(_upload.default.directory, user.avatar);
      const userAvatarFileExists = await _fs.default.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await _fs.default.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;
    await usersRepository.save(user);
    return user;
  }
}
var _default = exports.default = UpdateUserAvatarService;