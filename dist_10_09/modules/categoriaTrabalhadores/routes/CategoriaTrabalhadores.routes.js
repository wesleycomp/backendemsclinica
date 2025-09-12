"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _CategoriaTrabalhadoresController = _interopRequireDefault(require("../controllers/CategoriaTrabalhadoresController"));
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const categoriatrabalhadoresRouter = (0, _express.Router)();
const categoriatrabalhadoresController = new _CategoriaTrabalhadoresController.default();
categoriatrabalhadoresRouter.get('/', _isAuthenticated.default, categoriatrabalhadoresController.index);
categoriatrabalhadoresRouter.get('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), categoriatrabalhadoresController.show);
var _default = exports.default = categoriatrabalhadoresRouter;