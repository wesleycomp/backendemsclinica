"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _NaturezaJuridicaController = _interopRequireDefault(require("../controllers/NaturezaJuridicaController"));
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const naturezaJuridicaRouter = (0, _express.Router)();
const naturezaJuridicaController = new _NaturezaJuridicaController.default();
naturezaJuridicaRouter.get('/', _isAuthenticated.default, naturezaJuridicaController.index);
naturezaJuridicaRouter.get('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), naturezaJuridicaController.show);
var _default = exports.default = naturezaJuridicaRouter;