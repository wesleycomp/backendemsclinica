"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _SendForgotPasswordEmailService = _interopRequireDefault(require("../services/SendForgotPasswordEmailService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ForgotPasswordController {
  async create(request, response) {
    const {
      email
    } = request.body;
    const sendForgotPasswordEmail = new _SendForgotPasswordEmailService.default();
    await sendForgotPasswordEmail.execute({
      email
    });
    return response.status(204).json();
  }
}
exports.default = ForgotPasswordController;