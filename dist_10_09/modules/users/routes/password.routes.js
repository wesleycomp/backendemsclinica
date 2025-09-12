"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _celebrate = require("celebrate");
var _express = require("express");
var _ForgotPasswordController = _interopRequireDefault(require("../controllers/ForgotPasswordController"));
var _ResetPasswordController = _interopRequireDefault(require("../controllers/ResetPasswordController"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const passwordRouter = (0, _express.Router)();
const forgotPasswordController = new _ForgotPasswordController.default();
const resetPasswordController = new _ResetPasswordController.default();
passwordRouter.post('/forgot', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    email: _celebrate.Joi.string().email().required()
  }
}), forgotPasswordController.create);
passwordRouter.post('/reset', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    token: _celebrate.Joi.string().uuid().required(),
    password: _celebrate.Joi.string().required(),
    password_validation: _celebrate.Joi.string().required().valid(_celebrate.Joi.ref('password'))
  }
}), resetPasswordController.create);
var _default = exports.default = passwordRouter;