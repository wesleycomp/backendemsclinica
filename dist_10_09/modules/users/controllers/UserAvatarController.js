"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UpdateUserAvatarService = _interopRequireDefault(require("../services/UpdateUserAvatarService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UserAvatarController {
  async update(request, response) {
    const updateAvatar = new _UpdateUserAvatarService.default();
    const user = updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file?.fieldname
    });
    return response.json(user);
  }
}
exports.default = UserAvatarController;