"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _FornecedoresController = _interopRequireDefault(require("../controllers/FornecedoresController"));
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const fornecedorsRouter = (0, _express.Router)();
const fornecedorsController = new _FornecedoresController.default();
fornecedorsRouter.get('/', _isAuthenticated.default, fornecedorsController.index);
fornecedorsRouter.get('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), fornecedorsController.show);
fornecedorsRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    nome: _celebrate.Joi.string().uppercase().required(),
    cnpj: _celebrate.Joi.string().required(),
    inscricaoestadual: _celebrate.Joi.string().required(),
    inscricaomunicipal: _celebrate.Joi.string().required(),
    endereco: _celebrate.Joi.string().required(),
    telefone: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().required(),
    responsavel: _celebrate.Joi.string().required(),
    esocial: _celebrate.Joi.boolean().required(),
    convenio: _celebrate.Joi.boolean().required()
  }
}), fornecedorsController.create);
fornecedorsRouter.put('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    id: _celebrate.Joi.string().required(),
    nome: _celebrate.Joi.string().uppercase().required(),
    cnpj: _celebrate.Joi.string().required(),
    inscricaoestadual: _celebrate.Joi.string().required(),
    inscricaomunicipal: _celebrate.Joi.string().required(),
    endereco: _celebrate.Joi.string().required(),
    telefone: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().required(),
    responsavel: _celebrate.Joi.string().required(),
    esocial: _celebrate.Joi.boolean().required(),
    convenio: _celebrate.Joi.boolean().required(),
    created_at: _celebrate.Joi.string().required(),
    updated_at: _celebrate.Joi.string().required()
  },
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), fornecedorsController.update);
fornecedorsRouter.delete('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), fornecedorsController.delete);
var _default = exports.default = fornecedorsRouter;