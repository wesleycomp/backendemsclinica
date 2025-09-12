"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _TipoAsoController = _interopRequireDefault(require("../controllers/TipoAsoController"));
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const tipoAsoRouter = (0, _express.Router)();
const tipoAsoController = new _TipoAsoController.default();
tipoAsoRouter.get('/', _isAuthenticated.default, tipoAsoController.index);
tipoAsoRouter.get('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), tipoAsoController.show);
var _default = exports.default = tipoAsoRouter;