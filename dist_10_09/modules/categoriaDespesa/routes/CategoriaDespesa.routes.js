"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
var _CategoriaDespesaController = _interopRequireDefault(require("../controllers/CategoriaDespesaController"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const categoriaDespesaRouter = (0, _express.Router)();
const controller = new _CategoriaDespesaController.default();

// 📌 Listar todas
categoriaDespesaRouter.get('/', _isAuthenticated.default, controller.index);

// 📌 Buscar por ID
categoriaDespesaRouter.get('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), controller.show);

// 📌 Criar
categoriaDespesaRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    nome: _celebrate.Joi.string().trim().required(),
    codigo: _celebrate.Joi.string().allow(null, ''),
    ativo: _celebrate.Joi.boolean().default(true)
  }
}), controller.create);

// 📌 Atualizar
categoriaDespesaRouter.put('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  },
  [_celebrate.Segments.BODY]: {
    nome: _celebrate.Joi.string().trim().required(),
    codigo: _celebrate.Joi.string().allow(null, ''),
    ativo: _celebrate.Joi.boolean().required()
  }
}), controller.update);

// 📌 Deletar
categoriaDespesaRouter.delete('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), controller.delete);
var _default = exports.default = categoriaDespesaRouter;