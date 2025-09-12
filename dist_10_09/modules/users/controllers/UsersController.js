"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateUserService = _interopRequireDefault(require("../services/CreateUserService"));
var _UpdateUserServices = _interopRequireDefault(require("../services/UpdateUserServices"));
var _ListUserService = _interopRequireDefault(require("../services/ListUserService"));
var _ShowUserService = _interopRequireDefault(require("../services/ShowUserService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UsersController {
  async index(request, response) {
    const listUser = new _ListUserService.default();
    const user = await listUser.execute();
    return response.json(user);
  }
  async show(request, response) {
    const {
      id
    } = request.params;
    const showUsers = new _ShowUserService.default();
    const user = await showUsers.execute({
      id
    });
    return response.json(user);
  }
  async create(request, response) {
    const {
      name,
      email,
      password,
      perfil
    } = request.body;
    const createUser = new _CreateUserService.default();
    const user = await createUser.execute({
      name,
      email,
      password,
      perfil
    });
    return response.json(user);
  }
  async update(request, response) {
    const {
      id,
      name,
      email,
      password,
      perfil
    } = request.body;
    const resetPassword = new _UpdateUserServices.default();
    await resetPassword.execute({
      id,
      name,
      email,
      password,
      perfil
    });
    return response.json(resetPassword);
  }
}
exports.default = UsersController;