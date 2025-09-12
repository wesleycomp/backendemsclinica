"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
var _CentroCustoController = _interopRequireDefault(require("../controllers/CentroCustoController"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = (0, _express.Router)();
const ctrl = new _CentroCustoController.default();
router.get('/', _isAuthenticated.default, ctrl.index);
router.get('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), ctrl.show);
router.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    nome: _celebrate.Joi.string().trim().required(),
    codigo: _celebrate.Joi.string().allow('', null),
    ativo: _celebrate.Joi.boolean().default(true)
  }
}), ctrl.create);
router.put('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  },
  [_celebrate.Segments.BODY]: {
    nome: _celebrate.Joi.string().trim().required(),
    codigo: _celebrate.Joi.string().allow('', null),
    ativo: _celebrate.Joi.boolean().required()
  }
}), ctrl.update);
router.delete('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), ctrl.delete);
var _default = exports.default = router;