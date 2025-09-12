"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _TipoPagamentoController = _interopRequireDefault(require("../controllers/TipoPagamentoController"));
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const tipoPagamentoRouter = (0, _express.Router)();
const tipoPagamentoController = new _TipoPagamentoController.default();
tipoPagamentoRouter.get('/', _isAuthenticated.default, tipoPagamentoController.index);
tipoPagamentoRouter.get('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), tipoPagamentoController.show);
var _default = exports.default = tipoPagamentoRouter;