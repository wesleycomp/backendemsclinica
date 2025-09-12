"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _celebrate = require("celebrate");
var _express = require("express");
var _multer = _interopRequireDefault(require("multer"));
var _upload = _interopRequireDefault(require("../../../config/upload"));
var _UsersController = _interopRequireDefault(require("../controllers/UsersController"));
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
var _UserAvatarController = _interopRequireDefault(require("../controllers/UserAvatarController"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const usersRouter = (0, _express.Router)();
const usersController = new _UsersController.default();
const usersAvatarController = new _UserAvatarController.default();
const upload = (0, _multer.default)(_upload.default);
usersRouter.get('/', _isAuthenticated.default, usersController.index);
usersRouter.get('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), usersController.show);
usersRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().required(),
    perfil: _celebrate.Joi.string().required()
  }
}), usersController.create);
usersRouter.put('/edit', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    id: _celebrate.Joi.string().uuid().required(),
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().required(),
    perfil: _celebrate.Joi.string().required(),
    created_at: _celebrate.Joi.string().required(),
    updated_at: _celebrate.Joi.string().required()
  }
}), usersController.update);
usersRouter.patch('/avatar', _isAuthenticated.default, upload.single('avatar'), usersAvatarController.update);
var _default = exports.default = usersRouter;