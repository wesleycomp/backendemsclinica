"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _ProcedimentosController = _interopRequireDefault(require("../controllers/ProcedimentosController"));
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const procedimentosRouter = (0, _express.Router)();
const procedimentosController = new _ProcedimentosController.default();
procedimentosRouter.get('/', _isAuthenticated.default, procedimentosController.index);
procedimentosRouter.get('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), procedimentosController.show);
procedimentosRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().uppercase().required()
  }
}), procedimentosController.create);
procedimentosRouter.put('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    id: _celebrate.Joi.string().required(),
    name: _celebrate.Joi.string().required(),
    created_at: _celebrate.Joi.string().required(),
    updated_at: _celebrate.Joi.string().required()
  },
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), procedimentosController.update);
procedimentosRouter.delete('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), procedimentosController.delete);
var _default = exports.default = procedimentosRouter;