"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _NacionalidadeController = _interopRequireDefault(require("../controllers/NacionalidadeController"));
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const NacionalidadeRouter = (0, _express.Router)();
const NacionaliadeController = new _NacionalidadeController.default();
NacionalidadeRouter.get('/', _isAuthenticated.default, NacionaliadeController.index);
NacionalidadeRouter.get('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), NacionaliadeController.show);
var _default = exports.default = NacionalidadeRouter;