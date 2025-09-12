"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _FuncoesController = _interopRequireDefault(require("../controllers/FuncoesController"));
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const funcoesRouter = (0, _express.Router)();
const funcoesController = new _FuncoesController.default();
funcoesRouter.get('/', _isAuthenticated.default, funcoesController.index);
funcoesRouter.get('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), funcoesController.show);
funcoesRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    cbo: _celebrate.Joi.string().required()
  }
}), funcoesController.create);
funcoesRouter.put('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    id: _celebrate.Joi.string().required(),
    name: _celebrate.Joi.string().required(),
    cbo: _celebrate.Joi.string().required(),
    created_at: _celebrate.Joi.string().required(),
    updated_at: _celebrate.Joi.string().required()
  },
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), funcoesController.update);
funcoesRouter.delete('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), funcoesController.delete);
var _default = exports.default = funcoesRouter;