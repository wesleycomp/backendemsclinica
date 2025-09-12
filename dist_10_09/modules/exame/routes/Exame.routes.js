"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _ExameController = _interopRequireDefault(require("../controllers/ExameController"));
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const exameRouter = (0, _express.Router)();
const exameController = new _ExameController.default();
exameRouter.get('/', _isAuthenticated.default, exameController.index);
exameRouter.get('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), exameController.show);
exameRouter.get('/selecionando/localrealizacao', _isAuthenticated.default, exameController.showExamesPorLocal);
exameRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    procedimento_id: _celebrate.Joi.string().required(),
    name: _celebrate.Joi.string().uppercase().required(),
    valoravista: _celebrate.Joi.number().required(),
    valormedico: _celebrate.Joi.number().required(),
    valorems: _celebrate.Joi.number().required(),
    ativo: _celebrate.Joi.boolean().required(),
    usuariocadastro: _celebrate.Joi.string().required(),
    usuarioedicao: _celebrate.Joi.string().allow('', null).default(''),
    localrealizacaoexame: _celebrate.Joi.string()
  }
}), exameController.create);
exameRouter.put('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    id: _celebrate.Joi.string().required(),
    procedimento_id: _celebrate.Joi.string().required(),
    name: _celebrate.Joi.string().uppercase().required(),
    valoravista: _celebrate.Joi.number().required(),
    valormedico: _celebrate.Joi.number().required(),
    valorems: _celebrate.Joi.number().required(),
    ativo: _celebrate.Joi.boolean().required(),
    created_at: _celebrate.Joi.string().required(),
    updated_at: _celebrate.Joi.string().required(),
    usuarioedicao: _celebrate.Joi.string().required(),
    localrealizacaoexame: _celebrate.Joi.string()
  },
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), exameController.update);
exameRouter.delete('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), exameController.delete);
var _default = exports.default = exameRouter;