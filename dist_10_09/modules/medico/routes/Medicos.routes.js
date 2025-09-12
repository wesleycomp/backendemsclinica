"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _MedicosController = _interopRequireDefault(require("../controllers/MedicosController"));
var _MedicoFechamentoController = _interopRequireDefault(require("../controllers/MedicoFechamentoController"));
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MedicosRouter = (0, _express.Router)();
const medicosController = new _MedicosController.default();
const FechamentoMedicoController = new _MedicoFechamentoController.default();
MedicosRouter.get('/', _isAuthenticated.default, medicosController.index);
MedicosRouter.get('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), medicosController.show);
MedicosRouter.get('/medicoativo/list', _isAuthenticated.default, medicosController.getMedicoAtivoAll);
MedicosRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
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
}), medicosController.create);
MedicosRouter.put('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    id: _celebrate.Joi.string().required(),
    nome: _celebrate.Joi.string().uppercase().required(),
    cpf: _celebrate.Joi.string().required(),
    rg: _celebrate.Joi.string(),
    crm: _celebrate.Joi.string().required(),
    ufcrm: _celebrate.Joi.string().required(),
    telefone: _celebrate.Joi.string().required(),
    datanascimento: _celebrate.Joi.string().required(),
    endereco: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string(),
    ativo: _celebrate.Joi.boolean(),
    created_at: _celebrate.Joi.string().required(),
    updated_at: _celebrate.Joi.string().required()
  },
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), medicosController.update);
MedicosRouter.delete('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), medicosController.delete);
MedicosRouter.get('/fechamentomedico/:medico_id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    medico_id: _celebrate.Joi.string().uuid().required()
  }
}), FechamentoMedicoController.show);
MedicosRouter.post('/fechamentomedico', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    medico_id: _celebrate.Joi.string().required(),
    exame_id: _celebrate.Joi.string().required(),
    valor: _celebrate.Joi.number().required()
  }
}), FechamentoMedicoController.create);
MedicosRouter.put('/fechamentomedico/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    id: _celebrate.Joi.string().required(),
    medico_id: _celebrate.Joi.string().required(),
    exame_id: _celebrate.Joi.string().required(),
    valor: _celebrate.Joi.number().required(),
    created_at: _celebrate.Joi.string().required(),
    updated_at: _celebrate.Joi.string().required()
  },
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), FechamentoMedicoController.update);
MedicosRouter.delete('/fechamentomedico/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), FechamentoMedicoController.delete);
var _default = exports.default = MedicosRouter;