"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _MedicoExaminadorController = _interopRequireDefault(require("../controllers/MedicoExaminadorController"));
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MedicoExaminadorRouter = (0, _express.Router)();
const medicoExaminadorController = new _MedicoExaminadorController.default();
MedicoExaminadorRouter.get('/', _isAuthenticated.default, medicoExaminadorController.index);
MedicoExaminadorRouter.get('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), medicoExaminadorController.show);
MedicoExaminadorRouter.get('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), medicoExaminadorController.show);
MedicoExaminadorRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    nome: _celebrate.Joi.string().uppercase().required(),
    cpf: _celebrate.Joi.string().required(),
    rg: _celebrate.Joi.string(),
    crm: _celebrate.Joi.string().required(),
    ufcrm: _celebrate.Joi.string().required(),
    telefone: _celebrate.Joi.string().required(),
    datanascimento: _celebrate.Joi.string().required(),
    endereco: _celebrate.Joi.string(),
    email: _celebrate.Joi.string()
  }
}), medicoExaminadorController.create);
MedicoExaminadorRouter.put('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    id: _celebrate.Joi.string().required(),
    nome: _celebrate.Joi.string().uppercase().required(),
    cpf: _celebrate.Joi.string().required(),
    rg: _celebrate.Joi.string(),
    crm: _celebrate.Joi.string().required(),
    ufcrm: _celebrate.Joi.string().required(),
    telefone: _celebrate.Joi.string().required(),
    datanascimento: _celebrate.Joi.string().required(),
    endereco: _celebrate.Joi.string(),
    email: _celebrate.Joi.string(),
    created_at: _celebrate.Joi.string().required(),
    updated_at: _celebrate.Joi.string().required()
  },
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), medicoExaminadorController.update);
MedicoExaminadorRouter.delete('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), medicoExaminadorController.delete);
var _default = exports.default = MedicoExaminadorRouter;