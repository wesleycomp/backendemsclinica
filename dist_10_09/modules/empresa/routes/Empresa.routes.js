"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _EmpresaController = _interopRequireDefault(require("../controllers/EmpresaController"));
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const empresasRouter = (0, _express.Router)();
const empresasController = new _EmpresaController.default();
empresasRouter.get('/', _isAuthenticated.default, empresasController.index);
empresasRouter.get('/search', _isAuthenticated.default, empresasController.search); // 👈 novo endpoint
// 📊 listagem agrupada para fechamento (período)
empresasRouter.get('/fechamento/agrupado', _isAuthenticated.default, empresasController.listarAgrupado);
// listar exames detalhados por empresa no período
empresasRouter.get('/:id/exames', _isAuthenticated.default, empresasController.listarExames);
empresasRouter.get('/pesquisaempresaid/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), empresasController.showEmpresaId);
empresasRouter.get('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), empresasController.show);
empresasRouter.get('/consulta/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uppercase().required()
  }
}), empresasController.showEmpresaNome);
empresasRouter.get('/consultacnpj/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().required()
  }
}), empresasController.showEmpresaCnpj);
empresasRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    nome: _celebrate.Joi.string().uppercase().required(),
    cnpj: _celebrate.Joi.string().required(),
    cpf: _celebrate.Joi.string().allow('', null).default(''),
    inscricaoestadual: _celebrate.Joi.string().allow('', null).default(''),
    inscricaomunicipal: _celebrate.Joi.string().allow('', null).default(''),
    endereco: _celebrate.Joi.string().required(),
    telefone: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().allow('', null).default(''),
    responsavel: _celebrate.Joi.string().allow('', null).default(''),
    esocial: _celebrate.Joi.boolean().required(),
    convenio: _celebrate.Joi.boolean().required(),
    observacao: _celebrate.Joi.string().uppercase().allow('', null).default(''),
    empresafora: _celebrate.Joi.string().required()
  }
}), empresasController.create);
empresasRouter.put('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    id: _celebrate.Joi.string().required(),
    nome: _celebrate.Joi.string().uppercase().required(),
    cnpj: _celebrate.Joi.string().required(),
    cpf: _celebrate.Joi.string().allow('', null),
    inscricaoestadual: _celebrate.Joi.string().allow('', null),
    inscricaomunicipal: _celebrate.Joi.string().allow('', null),
    endereco: _celebrate.Joi.string().required(),
    telefone: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().allow('', null).default(''),
    responsavel: _celebrate.Joi.string().allow('', null).default(''),
    esocial: _celebrate.Joi.boolean(),
    convenio: _celebrate.Joi.boolean(),
    created_at: _celebrate.Joi.string().required(),
    updated_at: _celebrate.Joi.string().required(),
    observacao: _celebrate.Joi.string().allow('', null).default(''),
    empresafora: _celebrate.Joi.string().required()
  },
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), empresasController.update);
empresasRouter.delete('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), empresasController.delete);
var _default = exports.default = empresasRouter;