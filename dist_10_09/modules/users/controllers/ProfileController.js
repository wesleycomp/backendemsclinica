"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ShowProfileService = _interopRequireDefault(require("../services/ShowProfileService"));
var _UpdateProfileService = _interopRequireDefault(require("../services/UpdateProfileService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ProfileController {
  async show(request, response) {
    const showProfile = new _ShowProfileService.default();
    const user_id = request.user.id;
    const user = await showProfile.execute({
      user_id
    });
    return response.json(user);
  }
  async update(request, response) {
    const {
      name,
      email,
      password,
      old_password
    } = request.body;
    const user_id = request.user.id;
    const updateProfile = new _UpdateProfileService.default();
    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password
    });
    return response.json(user);
  }
}
exports.default = ProfileController;