"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _FinanceiroController = _interopRequireDefault(require("../controllers/FinanceiroController"));
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const financeiroRouter = (0, _express.Router)();
const financeiroController = new _FinanceiroController.default();
financeiroRouter.get('/', financeiroController.index);
financeiroRouter.get('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), financeiroController.show);
var _default = exports.default = financeiroRouter;