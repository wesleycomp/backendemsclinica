"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateSessionsService = _interopRequireDefault(require("../services/CreateSessionsService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class SessionsController {
  async create(request, response) {
    const {
      email,
      password
    } = request.body;
    const createSession = new _CreateSessionsService.default();
    const user = await createSession.execute({
      email,
      password
    });
    return response.json(user);
  }
}
exports.default = SessionsController;