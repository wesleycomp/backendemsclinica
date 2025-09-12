"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
var _ContaBancariaController = _interopRequireDefault(require("../controllers/ContaBancariaController"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// src/modules/contaBancaria/routes/ContaBancaria.routes.ts

const router = (0, _express.Router)();
const ctrl = new _ContaBancariaController.default();
router.get('/', _isAuthenticated.default, ctrl.index.bind(ctrl));
router.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    nome: _celebrate.Joi.string().required(),
    agencia: _celebrate.Joi.string().required(),
    numero: _celebrate.Joi.string().required(),
    tipo: _celebrate.Joi.string().allow(null, '')
  }
}), ctrl.create.bind(ctrl));
router.delete('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), ctrl.delete.bind(ctrl));
var _default = exports.default = router;