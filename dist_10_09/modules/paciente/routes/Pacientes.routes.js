"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _PacientesController = _interopRequireDefault(require("../controllers/PacientesController"));
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const pacientesRouter = (0, _express.Router)();
const pacientesController = new _PacientesController.default();
pacientesRouter.get('/', _isAuthenticated.default, pacientesController.index);
pacientesRouter.get('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), pacientesController.show);
pacientesRouter.get('/consulta/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uppercase().required()
  }
}), pacientesController.showPacienteNome);
pacientesRouter.get('/consultacpf/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().required()
  }
}), pacientesController.showPacienteCpf);
pacientesRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    empresa_id: _celebrate.Joi.string().required(),
    funcao_id: _celebrate.Joi.string().required(),
    categoriatrabalhador_id: _celebrate.Joi.string().required(),
    matricula: _celebrate.Joi.string().allow('', null).default(''),
    dataentradaempresa: _celebrate.Joi.string().allow('', null).default('null'),
    descricaoatividade: _celebrate.Joi.string().allow('', null).default(''),
    nome: _celebrate.Joi.string().uppercase().required(),
    cpf: _celebrate.Joi.string().required(),
    rg: _celebrate.Joi.string().required(),
    telefone: _celebrate.Joi.string().required(),
    genero: _celebrate.Joi.string().required(),
    tiposanguineo: _celebrate.Joi.string().allow('', null).default(''),
    nacionalidade_id: _celebrate.Joi.string().required(),
    nis: _celebrate.Joi.string().allow('', null).default(''),
    ctps: _celebrate.Joi.string().allow('', null).default(''),
    datanascimento: _celebrate.Joi.string().required(),
    endereco: _celebrate.Joi.string().allow('', null).default(''),
    email: _celebrate.Joi.string().allow('', null).default('')
  }
}), pacientesController.create);
pacientesRouter.put('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    id: _celebrate.Joi.string().required(),
    empresa_id: _celebrate.Joi.string().required(),
    funcao_id: _celebrate.Joi.string().required(),
    categoriatrabalhador_id: _celebrate.Joi.string().required(),
    matricula: _celebrate.Joi.string().allow('', null).default(''),
    dataentradaempresa: _celebrate.Joi.string().allow('', null).default('null'),
    descricaoatividade: _celebrate.Joi.string().allow('', null).default(''),
    nome: _celebrate.Joi.string().uppercase().required(),
    cpf: _celebrate.Joi.string().required(),
    rg: _celebrate.Joi.string().required(),
    telefone: _celebrate.Joi.string().required(),
    genero: _celebrate.Joi.string().required(),
    tiposanguineo: _celebrate.Joi.string().allow('', null).default(''),
    nacionalidade_id: _celebrate.Joi.string().required(),
    nis: _celebrate.Joi.string().allow('', null).default(''),
    ctps: _celebrate.Joi.string().allow('', null).default(''),
    datanascimento: _celebrate.Joi.string().allow('', null).default(''),
    endereco: _celebrate.Joi.string().allow('', null).default(''),
    email: _celebrate.Joi.string().allow('', null).default(''),
    created_at: _celebrate.Joi.string().required(),
    updated_at: _celebrate.Joi.string().required()
  },
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), pacientesController.update);
pacientesRouter.delete('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), pacientesController.delete);
var _default = exports.default = pacientesRouter;